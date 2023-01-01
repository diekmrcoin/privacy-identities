variable "name" { type = string }
variable "encrypted" {
  type    = bool
  default = true
}
variable "prevent_destroy" {
  type    = bool
  default = true
}
variable "origin_access_identity_arn" {
  type    = string
  default = null
}

output "id" { value = aws_s3_bucket.s3_bucket.id }
output "arn" { value = aws_s3_bucket.s3_bucket.arn }
output "bucket_regional_domain_name" { value = aws_s3_bucket.s3_bucket.bucket_regional_domain_name }

resource "aws_s3_bucket" "s3_bucket" {
  bucket = var.name
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_policy" "s3_bucket_policy" {
  count  = var.origin_access_identity_arn != null ? 1 : 0
  bucket = aws_s3_bucket.s3_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          AWS = var.origin_access_identity_arn
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.s3_bucket.arn}/*"
      },
      {
        Effect = "Allow"
        Principal = {
          AWS = var.origin_access_identity_arn
        },
        Action   = "s3:ListBucket",
        Resource = aws_s3_bucket.s3_bucket.arn
      }
    ]
  })
}

resource "aws_s3_bucket_public_access_block" "s3_bucket_public_access_block" {
  bucket                  = aws_s3_bucket.s3_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "s3_bucket_server_side_encryption_configuration" {
  count  = var.encrypted ? 1 : 0
  bucket = aws_s3_bucket.s3_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
