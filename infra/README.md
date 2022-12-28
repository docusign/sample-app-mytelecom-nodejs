# Deploy infrastructure to Azure cloud

### The Terraform script is consist of the next resources:
- Azure Network
- Azure Load Balancer
- Azure VM

## How to use

1. First of all, you have to have an Azure account. After we need to create a service principal
```
az login
az ad sp create-for-rbac --name <service_principal_name> --role Contributor --scopes /subscriptions/<subscription_id>
```
the <subscription_id> you can find in your Azure account UI.

(https://learn.microsoft.com/en-us/azure/developer/terraform/authenticate-to-azure?tabs=bash#create-a-service-principal). 

The output will be like this:
```
{
  "appId": "some value",
  "displayName": "some value",
  "password": "some value",
  "tenant": "some value"
}
```
2. Make environment variables, the values you can copy from the previous step, the subscription_id you can find in your Azure account.
```
export TF_VAR_subscription_id="some value"
export TF_VAR_tenant_id="some value"
export TF_VAR_client_id="some value"
export TF_VAR_client_secret="some value"
```
We need this to configure terraform provider.

3. To save terraform state, we need to create Storage Account and Storage Container, for this, you can you Azure CLI (https://learn.microsoft.com/en-us/azure/developer/terraform/store-state-in-azure-storage?tabs=azure-cli)
```
# Create a resource group
az group create --name $RESOURCE_GROUP_NAME --location eastus

# Create storage account
az storage account create --resource-group $RESOURCE_GROUP_NAME --name $STORAGE_ACCOUNT_NAME --sku Standard_LRS --encryption-services blob

# Create blob container
az storage container create --name $CONTAINER_NAME --account-name $STORAGE_ACCOUNT_NAME
```
or using the prepared terraform module remote-storage
```
cd remote-storage
terraform apply -var-file='../terraform.tfvars'
```
4. Configure the backend "azurerm" {} block on the root providers.tf file. Please change the values for the next params:
```
resource_group_name  = ""
storage_account_name = ""
container_name       = ""
```
5. Change the variables in terraform.tfvars (provide app name e.t.c)
6. Deploy infrastructure
```
terraform apply -var-file='terraform.tfvars'
```
Terraform will output you all values like Load Balancer Ip to access to VM via ssh or HTTP