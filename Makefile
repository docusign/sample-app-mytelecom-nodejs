repo_name    = exampletel
version      = latest
storage_account_name = exampletel
storage_account_container_name = exampletel

.PHONY: help
help:
	@echo "make push-frontend          	# push frontend docker image"
	@echo "make build-frontend         	# build frontend docker image"
	@echo "make build-backend          	# build backend docker image"
	@echo "make push-backend           	# push backend docker image"
	@echo "make login					# get Azure login"
	@echo "make acr-login				# get Azure repo login"
	@echo "make deploy					# deploy the stack to the server"
	@echo "make full-scope				# buld && push && deploy"
	@echo "make request-certs		   	# Run request SSL certificate"
	@echo "make renew-certs			   	# Renew Let's Encrypt certificate"
	@echo "make help					# show this help"

.PHONY: build-frontend 
build-frontend :
	docker build -t mytelecom-front:latest client/
	docker tag mytelecom-front:latest $(repo_name).azurecr.io/mytelecom-front:$(version)

.PHONY: push-frontend
push-frontend:
	$(MAKE) acr-login
	docker push $(repo_name).azurecr.io/mytelecom-front:$(version)

.PHONY: build-backend
build-backend:
	az storage blob download \
		--account-name $(storage_account_name) \
		--container-name $(storage_account_container_name) \
		--name .env \
		--file ./server/.env
	az storage blob download \
		--account-name $(storage_account_name) \
		--container-name $(storage_account_container_name) \
		--name private.key \
		--file ./server/private.key

	docker build -t mytelecom-backend:latest server/
	docker tag mytelecom-backend:latest $(repo_name).azurecr.io/mytelecom-backend:$(version)
	
.PHONY: push-backend
push-backend:
	$(MAKE) acr-login
	docker push $(repo_name).azurecr.io/mytelecom-backend:$(version)

.PHONY: login
login:
	az login

.PHONY: acr-login
acr-login:
	az acr login --name $(repo_name)

.PHONY: deploy
deploy:
	ANSIBLE_CONFIG=~/infra/deploy/ansible.cfg ansible-playbook -i infra/deploy/hosts.yaml ./infra/deploy/deploy.yml

.PHONY: request-certs
request-certs:
	ANSIBLE_CONFIG=~/infra/deploy/ansible.cfg ansible-playbook -i infra/deploy/hosts.yaml ./infra/deploy/get-cert.yml

.PHONY: renew-certs
renew-certs:
	ANSIBLE_CONFIG=~/infra/deploy/ansible.cfg ansible-playbook -i infra/deploy/hosts.yaml ./infra/deploy/cerbot-renew.yml

.PHONY: build-all
build-all:
	$(MAKE) build-frontend
	$(MAKE) build-backend

.PHONY: push-all
push-all:
	$(MAKE) push-frontend
	$(MAKE) push-backend

.PHONY: full-scope
full-scope:
	$(MAKE) build-frontend
	$(MAKE) build-backend
	$(MAKE) push-frontend
	$(MAKE) push-backend
	$(MAKE) deploy