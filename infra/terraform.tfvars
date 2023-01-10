app_name            = "mytelecom-simple-app"
resource_group_name = "mytelecom-simple-app-rg"
storage_name        = "mytelecom"
location            = "East US"
registry_name       = "mytelecom"
public_key          = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCqkB3ci4sR/FvrAVeYGV/JYZ9j0daSJJUaLAgpuQd4F75mrBorCpj3Msq14lJqTX/yhmnZVtT3rFlqOhfQ0hpYKBQRtrbzQGDPimiBlSg7daBGa09EFKXagZoY7DkwGJOQWDuVo5IwgNkI76PCziB13uTfFfyphW1YJ2ca+1+4ZINVltGnJafQ7G2C8P7mEdQetYcpcVIofxsp/X3NNFWef/j7VeY/jQAMDhRLvGfsYwPLK+qsz/ch0vhvpCvGcLAUNsz5iZJuG+rkST/avhMT8C5FhLsbaNkfYH8grI7+kLN3H5/xRUPbvr9L8Yv0Zf03HkzIq3AXQiYQU3yWqgbZ ei.roslyakov@gmail.com"
enable_vm_public_ip = false
nsg_rules = [
  {
    name                       = "HTTP"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "80"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  },
  {
    name                       = "HTTPS"
    priority                   = 1002
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "443"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  },
  {
    name                       = "SSH"
    priority                   = 1003
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "185.121.116.0/24"
    destination_address_prefix = "*"
  },
  {
    name                       = "SSH-REI-HOME"
    priority                   = 1004
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "213.110.148.240/32"
    destination_address_prefix = "*"
  }
]