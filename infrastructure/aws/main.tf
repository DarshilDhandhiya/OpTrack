terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-west-2"
}

# Reference other configuration files
module "vpc" {
  source = "./vpc"
}

module "iam" {
  source = "./iam"
}

module "eks" {
  source = "./eks"
  vpc_id = module.vpc.vpc_id
  subnet_ids = module.vpc.subnet_ids
  cluster_role_arn = module.iam.eks_cluster_role_arn
  node_role_arn = module.iam.eks_node_role_arn
}