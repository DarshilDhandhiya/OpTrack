# Input variables
variable "vpc_id" {}
variable "subnet_ids" {}
variable "cluster_role_arn" {}
variable "node_role_arn" {}

# EKS Cluster
resource "aws_eks_cluster" "main" {
  name     = "main-cluster"
  role_arn = var.cluster_role_arn
  version  = "1.27"

  vpc_config {
    subnet_ids = var.subnet_ids
  }

  depends_on = [
    aws_cloudwatch_log_group.eks
  ]
}

# CloudWatch log group for EKS cluster
resource "aws_cloudwatch_log_group" "eks" {
  name              = "/aws/eks/main-cluster/cluster"
  retention_in_days = 7
}

# EKS Node Group
resource "aws_eks_node_group" "main" {
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = "main-node-group"
  node_role_arn   = var.node_role_arn
  subnet_ids      = var.subnet_ids

  scaling_config {
    desired_size = 2
    max_size     = 3
    min_size     = 1
  }

  instance_types = ["t3.medium"]

  depends_on = [
    aws_eks_cluster.main
  ]
}