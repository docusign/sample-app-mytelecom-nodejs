###
#provider
###
variable "subscription_id" {}
variable "tenant_id" {}
variable "client_id" {}
variable "client_secret" {}

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