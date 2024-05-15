# Define directories
DIRS := auth client client-dev common event-bus inventory items orders

# Define the content of the .env file
define ENV_CONTENT
CHRONOS_DB=MongoDB
# Database connection string for Chronos to write metric to
CHRONOS_URI=mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.5
# Database connection strings for each microservice
MONGO_URI_AUTH=mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.5
MONGO_URI_ITEMS=mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.5
MONGO_URI_INVENTORY=mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.5
MONGO_URI_ORDERS=mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.5

# this is the secret for auth service to sign/verify json web tokens
JWT_KEY=thisStringDoesNotMatterItJustNeedsToBeDefined
# this is time til expiration for the json web token
JWT_LIFETIME=1d
endef

export ENV_CONTENT

# Default target
all: create_dirs create_env_files

# Create directoriesgit
create_dirs:
	@$(foreach dir,$(DIRS),mkdir -p $(dir);)

# Create .env files
create_env_files:
	@$(foreach dir,$(DIRS),echo "$$ENV_CONTENT" > $(dir)/.env;)

# Clean up .env files
clean:
	@$(foreach dir,$(DIRS),rm -f $(dir)/.env;)