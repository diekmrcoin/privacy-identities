terraform {
  required_version = "1.3.6"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.48"
    }
  }
  backend "s3" {
    bucket = "diekmrcoin-privacy-tools-tf-states"
    key    = "diekmrcoin-privacy-tools.tfstate"
    region = "eu-west-3"
  }
}

provider "aws" {
  region = "eu-west-3"
  default_tags {
    tags = {
      Name       = "diekmrcoin-privacy-tools"
      deployment = "terraform"
    }
  }
}

locals {
  name = "diekmrcoin-privacy-tools"
}

module "frontend" {
  source = "./frontend"
  name   = "${local.name}-frontend"
}
