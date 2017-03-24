#!/bin/sh

deploy_k8s_dev() {
	read -p "Deploying to k8s $environment environment in the $namespace namespace. Continue? (Y/n): " -n 1 -r
	echo  #                                                                                                                                                                      
    if [[ $REPLY =~ ^[Yy]$ ]]
	then
		echo "Configuring configMaps..."
		kubectl apply -f deployment/configmaps/$environment.yaml
		echo "Configuring secrets..."
		kubectl apply -f deployment/secrets/$environment.yaml
		echo "Configuring services..."
		kubectl apply -n $namespace -f deployment/services
		echo "Configuring deployments..."
		kubectl apply -n $namespace -f deployment/deployments/dev/deployment.yaml
		echo "Configuring ingress..."
		kubectl apply -f deployment/ingress/$environment.yaml
	fi
}

deploy_k8s() {
	read -p "Deploying to k8s $environment environment in the $namespace namespace. Continue? (Y/n): " -n 1 -r
	echo  #                                                                                                                                                                      
    if [[ $REPLY =~ ^[Yy]$ ]]
	then
		echo "Configuring configMaps..."
		kubectl apply -f deployment/configmaps/$environment.yaml
		echo "Configuring secrets..."
		kubectl apply -f deployment/secrets/$environment.yaml
		echo "Configuring services..."
		kubectl apply -n $namespace -f deployment/services
		echo "Configuring deployments..."
		kubectl apply -n $namespace -f deployment/deployments/deployment.yaml
		echo "Configuring ingress..."
		kubectl apply -f deployment/ingress/$environment.yaml
	fi
}

app=cr
namespace=$1
case $1 in
    dev)
        environment=development
        deploy_k8s_dev
        ;;
    staging)
        environment=staging
        deploy_k8s
        ;;
    production)
        environment=production
        deploy_k8s
        ;;
    *)
        echo "
usage: deploy [dev | staging | production]
"
		;;
esac
