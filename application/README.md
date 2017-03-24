# Simple API

API for Simple App.

* [Installation](#installation)
* [Starting App](#starting-app)
* [Testing](#testing)
* [Docker](#docker)

## Installation

These instructions are for use without docker

* Make sure that [Node.js](https://nodejs.org/) is installed.
* Install Node.js modules with `npm`:
```shell
npm install
```

## Starting App

* To run the app, copy the file `config/env/development.js` to `config/local.js` and substitute the settings to match your develoment environment.
* Start the app with `npm`:
```shell
npm start
```
* Navigate to [localhost:1500](http://localhost:1500). Please note `1500` is the default port used, you can change this in `config/local.js` or the corresponding enviroment file in `config/env` depending on your NODE_ENV os eniroment variable.

## Testing

* Tests are written using the [Mocha.js](https://mochajs.org/) library.
* To run tests with `npm` use:
```shell
npm test
```

## Docker 
### Using Kubernetes - Minikube

* Make sure that [Minikube](https://kubernetes.io/docs/getting-started-guides/minikube/) (Local kubernetes installtion) is setup & configured.
* Also install the nginx minikube controller if you havent already. You can deploy a copy using `kubectl create -f ./deployment/deployments/ingress/nginx-minikube/`
* Install and setup [dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html), and point your minikube installation IP to *.vm:
* Setup secrets found in deployment/deployments/deployment.yaml
* Run in the follwing order:
```shell
kubectl create ns cr-dev
sh ./deployment/deploy.sh dev
```

## Visit App

* Navigate to [http://api.simple.vm](http://api.simple.vm)
