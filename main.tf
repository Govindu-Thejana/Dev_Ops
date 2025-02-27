provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "frontend" {
  ami           = "ami-0c02fb55956c7d316" # Amazon Linux 2 AMI
  instance_type = "t2.micro"
  key_name      = "your-key-pair" # Replace with your EC2 key pair name

  tags = {
    Name = "Frontend"
  }

  security_groups = ["default"] # Ensure SSH access is allowed
}

resource "aws_instance" "backend" {
  ami           = "ami-0c02fb55956c7d316" # Amazon Linux 2 AMI
  instance_type = "t2.micro"
  key_name      = "your-key-pair" # Replace with your EC2 key pair name

  tags = {
    Name = "Backend"
  }

  security_groups = ["default"] # Ensure SSH access is allowed
}

output "frontend_ip" {
  value = aws_instance.frontend.public_ip
}

output "backend_ip" {
  value = aws_instance.backend.public_ip
}