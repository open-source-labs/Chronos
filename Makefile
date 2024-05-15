# Define directories
DIRS := examples/microservices/auth examples/microservices/client examples/microservices/client-dev \
        examples/microservices/common examples/microservices/event-bus \
        examples/microservices/inventory examples/microservices/items

# Define the content of the .env file
define ENV_CONTENT
CHRONOS_DB = MongoDB
CHRONOS_URI = mongodb+srv://chronoschild15:Codesmith999@cluster0.abrbjlj.mongodb.net/
CHRONOS_GRAFANA_API_KEY = Bearer glsa_89T0MEpiZfeNZLthW3mj8vMb7aXu9RTS_6ddf37da
MONGO_URI_AUTH = mongodb+srv://chronoschild15:Codesmith999@cluster0.abrbjlj.mongodb.net/
MONGO_URI_ITEMS = mongodb+srv://chronoschild15:Codesmith999@cluster0.abrbjlj.mongodb.net/
MONGO_URI_INVENTORY = mongodb+srv://chronoschild15:Codesmith999@cluster0.abrbjlj.mongodb.net/
MONGO_URI_ORDERS = mongodb+srv://chronoschild15:Codesmith999@cluster0.abrbjlj.mongodb.net/
JWT_KEY = thisStringDoesNotMatterItJustNeedsToBeDefined
JWT_LIFETIME = 1d
endef