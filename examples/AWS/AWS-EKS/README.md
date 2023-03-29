![Chronos logo](https://raw.githubusercontent.com/Chronos2-0/Chronos/master/app/assets/logo2.png)

# Chronos AWS EKS Example

As an all-in-one monitoring tool for microservices, Chronos lets users add EKS clusters for viewing cost and health metrics calculated by OpenCost, collected by Prometheus, and displayed using Grafana. 

## Prerequisites

You should install the following platforms/tools:
- [Docker](https://docs.docker.com/get-docker/)
    - Make sure to enable Kubernetes
    - Go to the gear icon in the upper right corner.  Go to Kubernetes and check the first box to enable.  Then click 'Apply and Restart.'
- [Helm](https://helm.sh/docs/intro/install/)
    - Make sure to run `helm repo add stable https://charts.helm.sh/stable` before installing any packages.
    - 

## Purpose and Design

This example serves as a tutorial for anyone new to Chronos, EKS, or even AWS. 

The main steps are:
- Creating an AWS account
- Setting up IAM
- Installing eksctl
- Creating an EKS cluster
- Installing the Amazon EBS CSI Driver
- Deploying the sample application
- Deploying Prometheus
- Deploying OpenCost
- Deploying and Configuring Grafana
- Adding EKS cluster to Chronos dashboard using the Grafana URL

This process can also be done using the AWS Command Line Interface (CLI) or the AWS User Interface (UI), but in this example we will be using the terminal.

## Creating an AWS Account

    1. Sign up at https://aws.amazon.com/console/.  Note that you will need to input your credit card information.  
    **Even though there are free services, setting up an EKS cluster according to this tutorial will cost you.**  
    2. Sign into your newly created account and change the region defined in the upper right corner to the region closest to you.

## Creating an AWS Account
    1. Right now you are the root user, and it's unadvisable to do anything as a root user 
    outside of billing and setting up groups.  To create a group, go to the Identity and Access Management (IAM) service. 
    For any service, simply look it up on the search bar at the top of the page.  
    2. Give the group a name (such as admin) and attach the AdminstratorAccess Policy.  
    3. Add a user to the group.  Grant the user Programmatic and Console access.  
    Make sure to download csv file containing the user's credentials. 
    4. Sign out and sign back in, this time using the url in the csv file.  I recommend saving the Account ID,
    username, and password in a secure place as you will need all three to log into this IAM role in the future.   
    5. Generate an access key for this user

## Installing eksctl
    1. To create a cluster in your terminal, you will need eksctl, a command line tool. 
    Follow this [documentation](https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html)
    and make sure to read up on your operating system. 

## Creating an EKS cluster
    1. To establish a connection between your AWS account and the terminal, go to IAM --> Users --> 
    Click a user and go to the Security Credentials tab.  Click Generate Access Key.  
    **Make sure to copy the access key and secret access key to a secure location**.
    2. In the terminal, run these commands:
    `export AWS_ACCESS_KEY_ID=<AWS Access Key>
    export AWS_SECRET_ACCESS_KEY=<AWS Secret Access Key>`
    
    3. Execute the command `eksctl create cluster --name=<cluster_name> --region=<cluster_region>`.  Note there are more [flags](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html) you can add to customize the cluster further.  Cluster creation takes around 20 minutes. 

## Installing the Amazon EBS CSI Driver
    You need to install the Elastic Block Store (EBS) Container Storage Interface (CSI) Driver so the EKS cluster can manage Amazon EBS volumes.  This is necessary if you want to run any application that has a database, such as Prometheus.  
    1. First, attach an OpenID Connect (OIDC) identity provider so that applications within the EKS cluster can access AWS resources.  Execute the command `eksctl utils associate-iam-oidc-provider --region=<cluster_region> --cluster=<cluster_name> --approve`.
    2. Next, grant the prospective EBS CSI driver IAM permissions to call the AWS APIs with this command:
    '''
    eksctl create iamserviceaccount \
    --name ebs-csi-controller-sa \
    --namespace kube-system \
    --cluster <cluster_name> \
    --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
    --approve \
    --role-only \
    --role-name AmazonEKS_EBS_CSI_DriverRole \
    --region <cluster_region>
    '''
    3. Finally, add the EBS CSI driver with this command:
        `eksctl create addon --name aws-ebs-csi-driver --cluster <cluster_name> --service-account-role-arn arn:aws:iam::<AWS Account ID>:role/AmazonEKS_EBS_CSI_DriverRole --region <cluster region>`
    Note the Account ID is the 12-digit number associated with the user you created earlier.  

## Deploying the sample application
    1. Execute the command `cd {your_path}/Chronos/examples/AWS/AWS-EKS` so you are in the AWS-EKS directory.
    2. Execute the command `kubectl apply -f knote` to deploy the sample application. 
    3. Run `kubectl get pods` to monitor the status of the pods.  Wait until all pods go from status 'ContainerCreating' to 'Running.'
    4. Run `kubectl get service knote` and visit the external IP address.  Add some notes or images to your functioning application! 

## Deploying Prometheus
    1. Exectute the command: 
        `helm repo add prometheus-community https://prometheus-community.github.io/helm-charts`
    2. Execute the command:
       ```
       helm install my-prometheus --repo https://prometheus-community.github.io/helm-charts prometheus \
        --namespace prometheus --create-namespace \
        --set pushgateway.enabled=false \
        --set alertmanager.enabled=false \
        -f https://raw.githubusercontent.com/opencost/opencost/develop/kubernetes/prometheus/extraScrapeConfigs.yaml
       ```

## Deploying OpenCost
    1. Execute the command:
        `kubectl apply --namespace opencost -f https://raw.githubusercontent.com/opencost/opencost/develop/kubernetes/opencost.yaml`
    2. Check the UI with the command: 
        `kubectl port-forward --namespace opencost service/opencost 9003 9090`
    
## Deploying and Configuring Grafana
    1. Execute the command:
        `helm repo add grafana https://grafana.github.io/helm-charts`
    2. Execute the command:
        ```
        helm install grafana grafana/grafana \
        --namespace grafana \
        --set persistence.storageClassName="gp2" \
        --set persistence.enabled=true \
        --set adminPassword='EKS!sAWSome' \
        --values ${HOME}/environment/grafana/grafana.yaml \
        --set service.type=LoadBalancer
        ```
    3. Execute these commands to get the URL.  Login in with the username admin and the password EKS!sAWsome
        ```
        export ELB=$(kubectl get svc -n grafana grafana -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
        echo "http://$ELB"
        ```
    4. To create the dashboard for monitoring Prometheus metrics, go to the sidebar, click on the four square icon, and click '+Import.'  For the ID, type in 3119. For tracking, select Prometheus.  Hit Create.  
    5. For the Opencost dashbaord, go to the sidebar, click on the four square icon, and click '+Import.'  Upload the opencostGrafana.json file, select Prometheus under tracking, and then create.
    6. You need to edit the Grafana ini file to make Grafana publicly accessible.  In order to do so, go to your terminal and run: 
    `kubectl edit -n grafana configmap/grafana`
    7. Press the 'i' key to start editing and add this into the Grafana ini section: 
    ```
    documentation:
    [security]
    allow_embedding: true
    [auth.anonymous]
    enabled: true
    [dataproxy]
    timeout: 600
    ```
    8. Type ':wq' to save the file and quit the editor. 
    9. Execute this command: `kubectl rollout restart deployment grafana -n grafana`

## Adding EKS cluster to Chronos dashboard using the Grafana URL
    1. Click the add modal on the dashboard.  Select Cloudbased Services.  Select EKS.  Input your Grafana URL (ex: xxxx.region.xxx.amazonaws.com) at the root path.  
    2. You should now be able to view two Grafana embedded dashboards -- the Prometheus Metrics & Opencost!  Anytime you want to view the status of other microservices, whether cloudbased or locally hosted, go back to the Dashboard on the sidebar menu and click a new modal.  

## Cleanup
    To tear down your cluster, execute this command:
       `eksctl delete cluster --name=<cluster_name> --region=<cluster_region>`

## Credit
    Credit for Knote application goes to the user learnK8s on [Github](https://github.com/learnk8s).  Here is the source project [folder](https://github.com/learnk8s/knote-js/tree/master/04-05/kube). 

