resource "azurerm_container_registry" "registry" {
  name                = var.registry_name
  location            = data.azurerm_resource_group.rg.location
  resource_group_name = data.azurerm_resource_group.rg.name
  sku                 = "Basic"
  admin_enabled       = true
}