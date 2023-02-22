## ECS Test CASE

ECS clustter is deployed with following process:
- build Docker Image 
- upload to Docker hub or ECR 
- update docker-compose file
- create and use docker context
- deploy application

### If want to install Chronos as dependency (optional)

1: add a `.env` file to the *server* folder that contains the following key/value pairs:
- `CHRONOS_DB`: `MongoDB` or `PostgreSQL`
- `CHRONOS_URI`: The URI to the desired MongoDB or PostgreSQL database to save health metrics via **Chronos**

2: Then look at the `package.json` file in the server folder and note how `@chronosmicro/tracker` is included as a dependency:
- If the @chronosmicro/tracker dependency is listed as a remote npm package (i.e. `"@chronosmicro/tracker": "^8.0.1"`), no further work is needed.

- If the @chronosmicro/tracker dependency is listed as a local npm package (i.e. `"@chronosmicro/tracker": "file:./chronos_npm_package"`), the Docker build will require that the the Chronos code is in this folder. Copy the _chronos_npm_package_ folder in manually.

### Deploy application in ECS

Step 1: build Docker Image 
```
docker build -t ecs-test:1.0 .
```
* If you want to change name and/or tag of docker image, please make sure to update docker-compose.yaml file accordingly. And do Not miss the . at the end as it denotes location of the Dockerfile
    
Step 2: docker-compose to test out image (image is stored locally right now)
``` 
    docker-compose -f docker-compose.yaml up
```
Step 3: Upload image to docker hub or ECR, update docker-compose.yaml with new URI of image
- you only need to update the image for ecs-test, mongo and mongo-express are pulled from docker public library
    
Step 4: Set up AWS account, grant access to floowing AWS IAM permissions listed [here](https://docs.docker.com/cloud/ecs-integration/#requirements). Some other permissions you would need includes:
* iam:DeleteRolePolicy
* iam:PutRolePolicy
* ecr:GetAuthorizationToken
* logs:TagResource
* elasticfilesystem:CreateFileSystem

If you push docker image in ECR you might need additional permission as well.   

Step 5: Generate access key in IAM -> Users -> yourusername -> secureity credentials -> Access Keys. _Make sure you save your secret access key as it is only accessible once when generated._

Step 6: Create and use AWS context, follow instruction [here](https://docs.docker.com/cloud/ecs-integration/#requirements). 

Step 7: Deploy test application in ECS
```
    docker compose up
```
### some notes about the ecs-test

The way deployment set up is using Fargate, you will not be able to see graph in cluster->metrics. Instead, check inside services or cloudwatch. The ultimate visulization is in Chronos!!!