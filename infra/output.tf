###
#LB
###
output "lb_name" {
  description = "Name of the Load Balancer"
  value       = azurerm_lb.lb.name
}

output "lb_id" {
  description = "ID of the Load Balancer."
  value       = azurerm_lb.lb.id
}

output "lb_public_ip_addresses" {
  description = "Public IP addresses of the Load Balancer"
  value       = azurerm_public_ip.lb.ip_address
}

###
#VM
###
output "vm_identity" {
  description = "azurerm_linux_virtual_machine"
  value       = azurerm_linux_virtual_machine.sm-app-linux-vm.identity
}
###
#REGISTRY
###
output "registry_url" {
  description = "The URL that can be used to log into the container registry"
  value       = azurerm_container_registry.registry.login_server
}

output "registry_username" {
  description = "The Username associated with the Container Registry Admin account - if the admin account is enabled"
  value       = azurerm_container_registry.registry.admin_username
}

output "registry_password" {
  description = "The Password associated with the Container Registry Admin account - if the admin account is enabled"
  value       = nonsensitive(azurerm_container_registry.registry.admin_password)
}

output "registry_id" {
  description = "The Container Registry ID"
  value       = azurerm_container_registry.registry.id
}

output "registry_configure" {
  description = "Registry configure"
  value       = <<CONFIGURE
Authenticate to the Container registry by running the following command:
$ docker login \
  -u $(terraform output registry_username) \
  -p $(terraform output registry_password) \
  $(terraform output registry_url)
CONFIGURE
}