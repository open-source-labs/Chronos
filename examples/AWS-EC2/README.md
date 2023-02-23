# Chronos AWS EC2 Example

Deploy AWS EC2 for testing [Chronos](https://github.com/open-source-labs/Chronos), an open-source developer tool that monitors health data from servers, microservices, Kubernetes clusters, and now, AWS services.

## Deploy application in AWS Beanstalk 

This sample AWS EC2 example allows developers to explore the functionality of Chronos with cloud-based applications.

## Setup

1. Install Docker and set up docker hub account

2. If you want to install Chronos as dependency (optional)
   note that for AWS models, current version of Chronos do NOT require 
   - add a .env file to the server folder that contains the following key/value pairs:

      - CHRONOS_DB: MongoDB or PostgreSQL
      - CHRONOS_URI: The URI to the desired MongoDB or PostgreSQL database to save health metrics via Chronos
   - Then look at the package.json file in the server folder and note how @chronosmicro/tracker is included as a dependency:

      - If the @chronosmicro/tracker dependency is listed as a remote npm package (i.e. "@chronosmicro/tracker": "^8.0.1"), no further work is needed.

      - If the @chronosmicro/tracker dependency is listed as a local npm package (i.e. "@chronosmicro/tracker": "file:./chronos_npm_package"), the Docker build will require that the the Chronos code is in this folder. Copy the chronos_npm_package folder in manually.



## Part 1 - Docker

1. build image for mm-prod
```
  docker build -t [orgname]/mm-prod .
```
2. Build the docker image from Dockerfile

   `docker build -t mm-prod .`

3. Build the docker image from Dockerfile-dev

   `docker build -t mm-dev -f Dockerfile-dev .`

4.  Build the docker image from Dockerfile-postgres
  `docker build -t [orgname]/mm-postgres -f Dockerfile-postgres .`


5. Run the container using docker-compose

   `docker-compose -f docker-compose-dev-hot.yml up`

- Check out your running application at localhost:8080. Then use `docker compose down` to stop containers

6. Testing
 `docker-compose -f docker-compose-test.yml up`
   - Check to see application passes tests

7. Uploading Images to private repo: images mm-postgres, mm-dev and mm-prod
   - if you use docker hub, use `docker push [imagename:tag]`
   - if you use ECR, use push commend to upload images to private repositories.

8. Update docker-compose files images URI (docker hub or ECR URI)

9. Zip application code into an archive file
```
git archive -v -o myMM.zip --format=zip HEAD
```

## Part 2 - AWS Beanstalk, IAM, EC2, RDS, ECR

1. Create user wiht `AdministratorAccess` policy and log in. Create Access Key and Secret Access Key, you would need these for launching Chronos for cloud-based application. (instruction at the end).

2. Start Elastic Beanstalk with following settings:
   - Platform: Docker running on 64bit Amazon Linux 2
   
3. Upload zipped file (from previous step 9), it will take a while to beanstalk to set things up.

4. Go to EC2 , mark the instance ID for later use (instruction at the end) under the Services menu and select 'Key Pairs'.

5. Create a new key pair and give it a meaningful name like 'mm-ec2-key' and select "pem" as the file format.

6. Open the Dashboard for your new environment and follow the URL at the top to see your application running in the cloud. Then Select Configuration -> Security and set the new mm-ec2-key up as the EC2 key pair and wait for the environment to update.


7. Create a new RDS database
   - set the "Master username" to mmadmin
   - Check 'Include previous generation classes'. 
   - Keep the defaults for DB instance size (instance class should be db.t2.micro), Storage type (General Purpose SSD), and Allocated storage (20Gb).
   - Uncheck "Enable storage autoscaling" to ensure that we stay in the free tier
   - Under "Connectivity", expand the "Additional connectivity configuration"
      - Under "VPC security group", select "Create new" and give the VPC Security group the name mm-db-sg. Then select the availability zone closest to you. Leave the Database port as the default for PostgresQL databases (5432).
   - Finally, expand the "Additional Configuration" tab. Name your database mmdb under "Initial Database Name". Additionally, Uncheck "Enable automatic backups" to ensure that you stay within the free tier.
   - Hit "Create Database" at the bottom

7. Go to EC2 instances
   - Services -> EC2 -> Security Groups There should be at least three security groups: 1. "default" (your default VPC's security group), 2. a randomly generated string of characters (this is the security group of your Elastic Beanstalk EC2 application), and 3. "mm-db-sg" which is the RDS security group we just created.
   - tag your RDS security group with a 'Name' and set it to mm-db-prod-sg. You can also set your EC2 security group to mm-prod-sg
   - new inbound rule for our 'mm-db-prod-sg' security group that allows postgres traffic from our 'mm-prod-sg' security group.
      - Go to Security group mm-db-prod-sg -> Inbound rules -> Edit Inbound rules
      - "Add Rule"
      - "Type" - "PostgresQL"
      - "Source" - "Custom" 
      -"Source" textbox - Scroll down to the "Security Groups" subsection, and select the security group associated with your Elastic Beanstalk EC2 environment. (If you have more than one security group for your EB environment, add all of them to this rule)
      -"Save rules"

8. Select the EC2 for the new enviroment and click "connect" - "SSH client", follow instruction to ssh into EC2 instance. Run the db creation script from EC2
```
   psql -h [RDS instance endpoint] mmdb -U mmadmin -f /var/app/current/scripts/db_init_prod.sql
```

9. Set up enviroment variables in application enviroment in Beanstalk
   - Configuration -> Software \
   - Add the following environment variables
      - NODE_ENV : production
      - RDS_HOSTNAME : [RDS 'endpoint']
      - RDS_DB_NAME : mmdb
      - RDS_USERNAME : mmadmin
      - RDS_PASSWORD : [your password]
      - RDS_PORT : 5432

10. Open the Dashboard for application environment and follow the URL at the top to see the application running in the cloud. 

## Monitoring EC2 instance on Chronos

1. Start Chronos desktop application.

2. Select `cloud-based`

3. Use Access Key, Secret Access Key, region, and EC2 instance ID to start monitoring EC2 instance. 

## Contributing
Chronos hopes to inspire an active community of both users and developers. For questions, comments, or contributions, please submit a pull request.

## People
[Snow X. Bai](https://github.com/xueapp)
[Taylor Zhang](https://github.com/taylrzhang)
[Tim Lee](https://github.com/timlee12)
[Roberto Meloni ](https://github.com/RobertoRueMeloni)


