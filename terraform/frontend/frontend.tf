variable "name" { type = string }
variable "route53_zone" { type = string }

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

provider "aws" {
  alias = "us_east_1"
  region = "us-east-1"
  default_tags {
    tags = {
      Name       = "diekmrcoin-privacy-tools"
      deployment = "terraform"
    }
  }
}

module "cloudfront" {
  source          = "../modules/cloudfront"
  description     = var.name
  acm_certificate = aws_acm_certificate.www
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

resource "aws_route53_record" "www" {
  zone_id = var.route53_zone
  name    = "privacytools.diekmrcoin.com"
  type    = "CNAME"
  ttl     = 300
  records = [module.cloudfront.domain_name]
}

resource "aws_acm_certificate" "www" {
  domain_name       = "privacytools.diekmrcoin.com"
  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }
  provider = aws.us_east_1
}

resource "aws_route53_record" "www_validation" {
  for_each = { for domain in aws_acm_certificate.www.domain_validation_options : domain.domain_name => domain }
  name     = each.value.resource_record_name
  type     = each.value.resource_record_type
  zone_id  = var.route53_zone
  records  = [each.value.resource_record_value]
  ttl      = 60
}
