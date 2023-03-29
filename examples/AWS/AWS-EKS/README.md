![Chronos logo](https://raw.githubusercontent.com/Chronos2-0/Chronos/master/app/assets/logo2.png)

# Chronos AWS EKS Example

As an all-in-one monitoring tool for microservices, Chronos lets users add EKS clusters for viewing cost and health metrics calculated by OpenCost, collected by Prometheus, and displayed using Grafana. 

## Purpose and Design

This example serves as a tutorial for anyone new to Chronos, EKS, or even AWS. 

The main steps are:
- Creating an AWS account
- Creating an AWS user with sufficient permissions
- Installing eksctl
- Creating an EKS cluster
- Installing the Amazon EBS CSI Driver
- Deploying the sample application
- Installing Helm
- Deploying Prometheus
- Deploying OpenCost
- Deploying Grafana
- Importing Grafana Dashboards
- Adding EKS cluster to Chronos dashboard using the Grafana URL

This process can also be done using the AWS Command Line Interface (CLI) or the AWS User Interface (UI).

## Creating an AWS Account

