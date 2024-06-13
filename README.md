# Express Node server

demo hacker rank api

### setup
1. mongo container
   2. `docker run --name mongodb -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=user -e MONGO_INITDB_ROOT_PASSWORD=pass mongodb/mongodb-community-server:7.0.3-ubuntu2204`
3. run Express app - `npm start`
4. run React web app - `cd web/app && npm start`
