# ─── Provider ───────────────────────────────────────────────────────
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# ─── Variables ──────────────────────────────────────────────────────
variable "aws_region" {
  description = "AWS region to deploy in"
  default     = "us-east-1"
}

variable "key_name" {
  description = "Name of your existing EC2 key pair"
  type        = string
}

variable "your_ip" {
  description = "Your IP address for SSH access (e.g. 203.0.113.5/32)"
  type        = string
}

# ─── Security Group ─────────────────────────────────────────────────
resource "aws_security_group" "unimeal_sg" {
  name        = "unimeal-sg"
  description = "Allow HTTP and SSH for UniMeal app"

  # Allow HTTP (port 80) from anywhere
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow SSH only from your IP
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.your_ip]
  }

  # Allow backend port (optional, for debugging)
  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "unimeal-security-group"
  }
}

# ─── EC2 Instance ───────────────────────────────────────────────────
resource "aws_instance" "unimeal_ec2" {
  ami           = "ami-0c02fb55956c7d316" # Amazon Linux 2 (us-east-1) — change for your region
  instance_type = "t2.micro"              # Free tier eligible
  key_name      = var.key_name

  vpc_security_group_ids = [aws_security_group.unimeal_sg.id]

  # Install Docker and Docker Compose on first boot
  user_data = <<-EOF
    #!/bin/bash
    yum update -y
    yum install -y docker git
    service docker start
    usermod -aG docker ec2-user
    curl -SL https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
  EOF

  tags = {
    Name = "unimeal-server"
  }
}

# ─── Outputs ────────────────────────────────────────────────────────
output "ec2_public_ip" {
  description = "Public IP of the UniMeal EC2 instance"
  value       = aws_instance.unimeal_ec2.public_ip
}

output "ec2_public_dns" {
  description = "Public DNS of the UniMeal EC2 instance"
  value       = aws_instance.unimeal_ec2.public_dns
}
