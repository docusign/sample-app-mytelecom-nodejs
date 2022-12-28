resource "azurerm_resource_group" "simple_app_rg" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_storage_account" "tfstate" {
  name                     = "${var.storage_name}state"
  resource_group_name      = azurerm_resource_group.simple_app_rg.name
  location                 = azurerm_resource_group.simple_app_rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  tags = {
    Terraform = "True",
    Name      = "${var.storage_name}state"
  }
}

resource "azurerm_storage_container" "tfstate" {
  name                  = "${var.storage_name}tfstate"
  storage_account_name  = azurerm_storage_account.tfstate.name
  container_access_type = "blob"
}