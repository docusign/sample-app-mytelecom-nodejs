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

output "lb_private_ip_address" {
  description = "Private IP address of the Load Balancer"
  value       = azurerm_lb.lb.private_ip_address
}

output "lb_private_ip_addresses" {
  description = "Private IP addresses of the Load Balancer"
  value       = azurerm_lb.lb.private_ip_addresses
}

output "lb_public_ip_addresses" {
  description = "Public IP addresses of the Load Balancer"
  value       = azurerm_public_ip.lb.ip_address
}

output "backend_address_pool_id" {
  description = "ID of the associated default backend address pool."
  value       = azurerm_lb_backend_address_pool.default_pool.id
}

output "backend_address_pool_name" {
  description = "Name of the associated default backend address pool."
  value       = azurerm_lb_backend_address_pool.default_pool.name
}

output "backend_address_pool_ip_configurations" {
  description = "IP configurations of the associated default backend address pool."
  value       = azurerm_lb_backend_address_pool.default_pool.backend_ip_configurations
}

output "backend_address_pool_load_balancing_rules" {
  description = "Load balancing rules of the associated default backend address pool."
  value       = azurerm_lb_backend_address_pool.default_pool.load_balancing_rules
}

output "frontend_ip_configuration" {
  description = "Load Balancer's frontend IP configuration as described here https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/lb#frontend_ip_configuration."
  value       = azurerm_lb.lb.frontend_ip_configuration
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