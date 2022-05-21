# Group 45 Capstone_project_Nodejs with Express, Mysql, and JWT

## Features
1. User can sign up
2. User can sign in
3. User can post property
4. User can update property
5. User can set property as sold
6. user can delete property

## Tools
* NodeJS/Express: Server
* MySQL: Storage
* JWT: Token based authentication
* bcryptjs: Password security
* winston/morgan: Logs
* Joi: Validations
* Jest: Authomating unit test

## Available scripts
* `start`: Starts the server with node
* `start:dev`: Starts the server in watch mode
* `db:up`: Creates the database
* `db:down`: Drops the database
* `tables:up`: Creates database tables
* `db:init`: Creates both the database and tables

## API Usage

User must signup using the route below to gain a token for a day to post property, 

```sh
/api/v1/auth/signup
```
update the property the user posted

```sh
/api/v1/auth/property/:property_id
```

set property to sold and 

```sh
/api/v1/auth/property/:property_id/sold
```

delete property

```sh
/api/v1/auth/property/:property_id
```

