variable "name" { type = string }

module "cloudfront_access_identity" {
  source = "../modules/origin-access-identity"
  name   = "${var.name}-frontend"
}

module "bucket" {
  source                     = "../modules/s3"
  name                       = var.name
  prevent_destroy            = false
  encrypted                  = true
  origin_access_identity_arn = module.cloudfront_access_identity.iam_arn
}

resource "aws_cloudfront_cache_policy" "default" {
  name        = "${var.name}-default-cache-policy"
  comment     = "Default cache policy for ${var.name} frontend"
  default_ttl = 1
  max_ttl     = 1
  min_ttl     = 1
  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "all"
    }
    headers_config {
      header_behavior = "whitelist"
      headers {
        items = ["Authorization"]
      }
    }
    query_strings_config {
      query_string_behavior = "all"
    }
  }
}

module "cloudfront" {
  source      = "../modules/cloudfront"
  description = var.name
  origins_s3_bucket = [
    {
      id                          = module.bucket.id
      bucket_regional_domain_name = module.bucket.bucket_regional_domain_name
    }
  ]
  origins_custom = []
  origin_groups  = []
  default_cache_behavior = {
    cache_policy_id             = aws_cloudfront_cache_policy.default.id
    origin_request_policy_id    = null
    response_headers_policy_id  = null
    target_origin_id            = module.bucket.id
    function_association        = []
    lambda_function_association = []
  }
  ordered_cache_behavior = []
  error_response = {
    response_code      = 200
    response_page_path = "/index.html"
  }
  origin_access_identity = {
    cloudfront_access_identity_path = module.cloudfront_access_identity.cloudfront_access_identity_path
  }
}
