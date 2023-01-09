resource "azurerm_linux_virtual_machine" "sm-app-linux-vm" {

  name                  = "${var.app_name}-vm"
  location              = data.azurerm_resource_group.rg.location
  resource_group_name   = data.azurerm_resource_group.rg.name
  network_interface_ids = [azurerm_network_interface.vm.id]
  size                  = var.vm_size

  os_disk {
    name                 = "${var.app_name}-os_disk"
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS" #Consider Storage Type
  }

  source_image_reference {
    publisher = var.source_image_reference["publisher"]
    offer     = var.source_image_reference["offer"]
    sku       = var.source_image_reference["sku"]
    version   = var.source_image_reference["version"]
  }

  computer_name                   = var.computer_name
  admin_username                  = var.admin_username
  disable_password_authentication = true

  admin_ssh_key {
    username   = var.admin_username
    public_key = var.public_key
  }
  custom_data = base64encode(file("scripts/init.sh"))

  identity {
    type  = "SystemAssigned"
  }

  tags = {
    Name = "${var.app_name}-vm",
    Env  = "simple-app"
  }
}

resource "azurerm_role_assignment" "sm-app-linux-vm-role-assignment" {
  scope                = data.azurerm_resource_group.rg.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_linux_virtual_machine.sm-app-linux-vm.identity.0.principal_id
}
