#!/bin/sh

cleaup_k8s_dev() {
	read -p "Removing k8s $environment environment in the $namespace namespace. Continue? (Y/n): " -n 1 -r
	echo  #                                                                                                                                                                      
    if [[ $REPLY =~ ^[Yy]$ ]]
	then
		echo "Removing configMaps..."
		kubectl delete -f deployment/configmaps/$environment.yaml
		echo "Removing secrets..."
		kubectl delete -f deployment/secrets/$environment.yaml
		echo "Removing services..."
		kubectl delete -n $namespace -f deployment/services
		echo "Removing deployments..."
		kubectl delete -n $namespace -f deployment/deployments/dev/deployment.yaml
		echo "Removing ingress..."
		kubectl delete -f deployment/ingress/$environment.yaml
	fi
}

cleaup_k8s() {
	read -p "Removing k8s $environment environment in the $namespace namespace. Continue? (Y/n): " -n 1 -r
	echo  #                                                                                                                                                                      
    if [[ $REPLY =~ ^[Yy]$ ]]
	then
		echo "Removing configMaps..."
		kubectl delete -f deployment/configmaps/$environment.yaml
		echo "Removing secrets..."
		kubectl delete -f deployment/secrets/$environment.yaml
		echo "Removing services..."
		kubectl delete -n $namespace -f deployment/services
		echo "Removing deployments..."
		kubectl delete -n $namespace -f deployment/deployments/deployment.yaml
		echo "Removing ingress..."
		kubectl delete -f deployment/ingress/$environment.yaml
	fi
}

app=cr
namespace=$1
case $1 in
    dev)
        environment=development
        cleaup_k8s_dev
        ;;
    staging)
        environment=staging
        cleaup_k8s
        ;;
    production)
        environment=production
        cleaup_k8s
        ;;
    *)
        echo "
usage: cleanup [dev | staging | production]
"
		;;
esac
