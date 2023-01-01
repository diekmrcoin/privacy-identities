variable "name" { type = string }
output "iam_arn" { value = aws_cloudfront_origin_access_identity.origin-access-identity.iam_arn }
output "cloudfront_access_identity_path" { value = aws_cloudfront_origin_access_identity.origin-access-identity.cloudfront_access_identity_path }

resource "aws_cloudfront_origin_access_identity" "origin-access-identity" {
  comment = var.name
}
