variable "acm_certificate" {
  type = object({
    arn         = string
    domain_name = string
  })
  default = null
}

variable "default_cache_behavior" {
  type = object({
    cache_policy_id            = string
    origin_request_policy_id   = string
    response_headers_policy_id = string
    target_origin_id           = string

    lambda_function_association = list(object({
      event_type = string
      function   = object({ qualified_arn = string })
    }))

    function_association = list(object({
      event_type = string
      function   = object({ arn = string })
    }))
  })
}

variable "default_root_object" {
  type    = string
  default = "index.html"
}

variable "description" { type = string }

variable "error_response" {
  type = object({
    response_code      = number
    response_page_path = string
  })
}

variable "ordered_cache_behavior" {
  type = list(object({
    allowed_methods          = list(string)
    cache_policy_id          = string
    origin_request_policy_id = string
    path_pattern             = string
    target_origin_id         = string

    lambda_function_association = list(object({
      event_type = string
      function   = object({ qualified_arn = string })
    }))

    function_association = list(object({
      event_type = string
      function   = object({ arn = string })
    }))
  }))
}

variable "origin_access_identity" {
  type = object({
    cloudfront_access_identity_path = string
  })
}

variable "origins_s3_bucket" {
  type = list(object({
    id                          = string
    bucket_regional_domain_name = string
  }))
}

variable "origins_custom" {
  type = list(object({
    id          = string
    domain_name = string
  }))
}

variable "origin_groups" {
  type = list(object({
    id           = string
    origins      = list(object({ id = string }))
    status_codes = list(number)
  }))
}

variable "waf_web_acl" {
  type = object({
    arn = string
  })
  default = null
}

output "domain_name" {
  value = aws_cloudfront_distribution.cloudfront_distribution.domain_name
}

output "hosted_zone_id" {
  value = aws_cloudfront_distribution.cloudfront_distribution.hosted_zone_id
}

resource "aws_cloudfront_distribution" "cloudfront_distribution" {
  aliases             = var.acm_certificate != null ? [var.acm_certificate.domain_name] : []
  comment             = var.description
  default_root_object = var.default_root_object
  enabled             = true
  is_ipv6_enabled     = true
  price_class         = "PriceClass_All"
  web_acl_id          = var.waf_web_acl != null ? var.waf_web_acl.arn : null

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 404
    response_code         = var.error_response.response_code
    response_page_path    = var.error_response.response_page_path
  }

  default_cache_behavior {
    allowed_methods            = ["GET", "HEAD"]
    cached_methods             = ["GET", "HEAD"]
    cache_policy_id            = var.default_cache_behavior.cache_policy_id
    compress                   = true
    origin_request_policy_id   = var.default_cache_behavior.origin_request_policy_id
    response_headers_policy_id = var.default_cache_behavior.response_headers_policy_id
    target_origin_id           = var.default_cache_behavior.target_origin_id
    viewer_protocol_policy     = "redirect-to-https"

    dynamic "lambda_function_association" {
      for_each = var.default_cache_behavior.lambda_function_association

      content {
        event_type   = lambda_function_association.value["event_type"]
        include_body = false
        lambda_arn   = lambda_function_association.value["function"].qualified_arn
      }
    }

    dynamic "function_association" {
      for_each = var.default_cache_behavior.function_association
      content {
        event_type   = function_association.value["event_type"]
        function_arn = function_association.value["function"].arn
      }
    }
  }

  dynamic "ordered_cache_behavior" {
    for_each = var.ordered_cache_behavior
    content {
      allowed_methods          = ordered_cache_behavior.value["allowed_methods"] == null ? ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"] : ordered_cache_behavior.value["allowed_methods"]
      cached_methods           = ["GET", "HEAD"]
      cache_policy_id          = ordered_cache_behavior.value["cache_policy_id"]
      compress                 = true
      origin_request_policy_id = ordered_cache_behavior.value["origin_request_policy_id"]
      path_pattern             = ordered_cache_behavior.value["path_pattern"]
      target_origin_id         = ordered_cache_behavior.value["target_origin_id"]
      viewer_protocol_policy   = "redirect-to-https"

      dynamic "lambda_function_association" {
        for_each = ordered_cache_behavior.value["lambda_function_association"]
        content {
          event_type   = lambda_function_association.value["event_type"]
          include_body = false
          lambda_arn   = lambda_function_association.value["function"].qualified_arn
        }
      }

      dynamic "function_association" {
        for_each = ordered_cache_behavior.value["function_association"]
        content {
          event_type   = function_association.value["event_type"]
          function_arn = function_association.value["function"].arn
        }
      }
    }
  }

  dynamic "origin_group" {
    for_each = var.origin_groups
    content {
      origin_id = origin_group.value["id"]

      failover_criteria {
        status_codes = origin_group.value["status_codes"]
      }

      dynamic "member" {
        for_each = origin_group.value["origins"]
        content {
          origin_id = member.value["id"]
        }
      }
    }
  }

  dynamic "origin" {
    for_each = var.origins_s3_bucket
    content {
      domain_name = origin.value["bucket_regional_domain_name"]
      origin_id   = origin.value["id"]

      s3_origin_config {
        origin_access_identity = var.origin_access_identity.cloudfront_access_identity_path
      }
    }
  }

  dynamic "origin" {
    for_each = var.origins_custom
    content {
      domain_name = origin.value["domain_name"]
      origin_id   = origin.value["id"]

      custom_origin_config {
        http_port              = 80
        https_port             = 443
        origin_protocol_policy = "https-only"
        origin_ssl_protocols   = ["TLSv1.2"]
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn            = var.acm_certificate != null ? var.acm_certificate.arn : null
    cloudfront_default_certificate = var.acm_certificate == null
    minimum_protocol_version       = var.acm_certificate != null ? "TLSv1.2_2021" : null
    ssl_support_method             = var.acm_certificate != null ? "sni-only" : null
  }
}
