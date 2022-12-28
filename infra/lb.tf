resource "azurerm_lb_rule" "http-inbound-rules" {
  loadbalancer_id                = azurerm_lb.lb.id
  name                           = "${var.app_name}-http-inbound-rule"
  protocol                       = "Tcp"
  frontend_port                  = 80
  backend_port                   = 80
  frontend_ip_configuration_name = "${var.app_name}-publicIPForLB"
  # probe_id                       = azurerm_lb_probe.http-inbound-probe.id
  backend_address_pool_ids = [azurerm_lb_backend_address_pool.default_pool.id]
}

resource "azurerm_lb_rule" "https-inbound-rules" {
  loadbalancer_id                = azurerm_lb.lb.id
  name                           = "${var.app_name}-https-inbound-rule"
  protocol                       = "Tcp"
  frontend_port                  = 443
  backend_port                   = 443
  frontend_ip_configuration_name = "${var.app_name}-publicIPForLB"
  # probe_id                       = azurerm_lb_probe.https-inbound-probe.id
  backend_address_pool_ids = [azurerm_lb_backend_address_pool.default_pool.id]
}

resource "azurerm_lb_rule" "ssh-inbound-rules" {
  loadbalancer_id                = azurerm_lb.lb.id
  name                           = "${var.app_name}-ssh-inbound-rule"
  protocol                       = "Tcp"
  frontend_port                  = 22
  backend_port                   = 22
  frontend_ip_configuration_name = "${var.app_name}-publicIPForLB"
  # probe_id                       = azurerm_lb_probe.https-inbound-probe.id
  backend_address_pool_ids = [azurerm_lb_backend_address_pool.default_pool.id]
}

resource "azurerm_lb_probe" "http-inbound-probe" {
  loadbalancer_id = azurerm_lb.lb.id
  name            = "${var.app_name}-http-inbound-probe"
  port            = 80
}

resource "azurerm_lb_probe" "https-inbound-probe" {
  loadbalancer_id = azurerm_lb.lb.id
  name            = "${var.app_name}-https-inbound-probe"
  port            = 443
}

resource "azurerm_lb" "lb" {
  name                = "${var.app_name}-loadBalancer"
  location            = data.azurerm_resource_group.rg.location
  resource_group_name = data.azurerm_resource_group.rg.name

  frontend_ip_configuration {
    name                 = "${var.app_name}-publicIPForLB"
    public_ip_address_id = azurerm_public_ip.lb.id
  }
}

resource "azurerm_lb_backend_address_pool" "default_pool" {
  loadbalancer_id = azurerm_lb.lb.id
  name            = "${var.app_name}-BackEndAddressPool"
}

resource "azurerm_network_interface_backend_address_pool_association" "this" {
  network_interface_id    = azurerm_network_interface.vm.id
  ip_configuration_name   = azurerm_network_interface.vm.ip_configuration.0.name
  backend_address_pool_id = azurerm_lb_backend_address_pool.default_pool.id
}