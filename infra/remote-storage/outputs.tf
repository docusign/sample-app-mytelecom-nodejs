output "resource_group_name" {
  description = "The Name which should be used for this Resource Group"
  value       = azurerm_resource_group.simple_app_rg.name
}

output "resource_group_location" {
  description = "Specifies the supported Azure location where the resource exists."
  value       = azurerm_resource_group.simple_app_rg.location
}

output "azurerm_storage_account_name" {
  description = "Specifies the name of the storage account."
  value       = azurerm_storage_account.tfstate.name
}

output "azurerm_storage_container_name" {
  description = "The name of the Container which should be created within the Storage Account."
  value       = azurerm_storage_container.tfstate.name
}