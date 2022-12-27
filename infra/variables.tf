###
#provider
###
variable "subscription_id" {}
variable "tenant_id" {}
variable "client_id" {}
variable "client_secret" {}
###
#app
###
variable "app_name" {
  default     = ""
  description = "The simple app name"
}

variable "resource_group_name" {
  default     = ""
  description = "The Name which should be used for this Resource Group"
}

variable "storage_name" {
  default     = ""
  description = "The name for the storage account and container"
}

variable "location" {
  default     = "East US"
  description = "The Azure Region where the resource will be created"
}

variable "registry_name" {
  default     = ""
  description = "Specifies the name of the Container Registry. Only Alphanumeric characters allowed"
}

###
#network
###
variable "network_name" {
  default     = "acctvn"
  description = "The name of the virtual network."
}

variable "network_address_space" {
  default     = ["10.0.0.0/16"]
  description = "The address space that is used the virtual network. You can supply more than one address space."
}

variable "subnet_name" {
  default     = "acctsub"
  description = "The name of the virtual network."
}

variable "subnet_address_prefixes" {
  default     = ["10.0.2.0/24"]
  description = "The address space that is used the virtual network. You can supply more than one address space."
}
###
#vm
###
variable "vm_size" {
  default     = "Standard_B1s"
  description = "The name of the virtual network."
}

variable "enable_vm_public_ip" {
  default     = false
  description = "Enable public ip for vm?"
}
variable "source_image_reference" {
  type = map(any)
  default = {
    publisher = "Canonical"                    #az vm image list -p "Canonical" --output table
    offer     = "0001-com-ubuntu-server-focal" # az vm image list -p "Canonical" --output table
    sku       = "20_04-lts-gen2"               #az vm image list -s "20.04-LTS" --output table
    version   = "latest"
  }
  description = "A source_image_reference block as defined below. Changing this forces a new resource to be created."
}

variable "computer_name" {
  default     = "simple-app-vm"
  description = "Specifies the Hostname which should be used for this Virtual Machine"
}

variable "admin_username" {
  default     = "smappuser"
  description = "The username of the local administrator used for the Virtual Machine. Changing this forces a new resource to be created."
}

variable "public_key" {
  default     = ""
  description = "The Public Key which should be used for authentication, which needs to be at least 2048-bit and in ssh-rsa format. Changing this forces a new resource to be created."
}

variable "nsg_rules" {
  description = "List of objects representing security rules, as defined below."
  type = list(object({
    name                       = string
    priority                   = number
    direction                  = string
    access                     = string
    protocol                   = string
    source_port_range          = string
    destination_port_range     = string
    source_address_prefix      = string
    destination_address_prefix = string
  }))
}
