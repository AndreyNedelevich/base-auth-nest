### Summary
The following project provides REST API for Base Auth

### Running DEV mode
1. Install the supported version of Node.js (v20.10.0)
2. Install all Node dependencies using:
   > npm install
3. Up docker compose container for PostgreSQL and Redis using:
   > npm run start:docker:db
4. To start the application in watch mode, use the command:
   > run start:dev

### Running PROD mode with Docker
1. To start the application in production mode with Docker, use the command:
   > start:docker:prod
   
### Swagger
1. To open swagger use URL:
   > http://0.0.0.0:3000/docs
2. Fill credentials from env file for example:
   > SWAGGER_USER=admin \
   > SWAGGER_PASSWORD=admin
   
### Migrations

* To apply on un-applied migrations to your database, use the command:
   > run migration:run
* To revert previously applied migration, use the command:
   > run migration:revert
* To create new empty migration, use the command:
   > run migration:create -name=MIGRATION-NAME
* To generate new migration based on the changes you've made, use the command:
   > run migration:generate -name=MIGRATION-NAME

### Formatting
* To check your code for lint issues and try fix, use the command:
   > npm run lint

### Building the application
* To build the application, use the command:
   > npm run build

### Testing
* To run tests on the application, use the command
   > npm run test
* To run test in development (watch) mode, use the command:
   > npm run test:dev
* To run test in debug mode, use the command:
   > npm run test:debug
* To run e2e tests, use the command:
   > npm run test:e2e
* To check tests coverage, use the command:
   > npm run test:cov
  
### Need to add:
* Rate limiting
* Add transactions to DB
