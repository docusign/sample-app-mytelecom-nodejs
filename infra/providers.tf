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
    resource_group_name  = "mytelecom-simple-app-rg"
    storage_account_name = "mytelecomstate"
    container_name       = "mytelecomtfstate"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
  tenant_id       = var.tenant_id
  client_id       = var.client_id
  client_secret   = var.client_secret
}