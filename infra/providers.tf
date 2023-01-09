terraform {

  required_version = ">= 0.12"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.0.0"
    }
  }

  #Configure Remote State - Backend - on Azure Storage Account
  backend "azurerm" {
    resource_group_name  = "exampletel"
    storage_account_name = "exampletel"
    container_name       = "exampletel"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
}