﻿# Full API for Tugboats, Crew and Ships Management 🛳🚢

This API is a personal project based on the identified needs of companies that continue to use paper as a means of notification and storage. The API is designed to manage the information of tugboats and all their activities, allowing the user to create, read, update and delete the information of each one of them. This includes captain, crew, customers and ships management.

## Admin Frontend
Simple frontend for Admin CRUD: https://github.com/santilapi13/Tugboat_Admin_Frontend
(The MongoDB database must be configured first and its URL must be specified in the .env file)

## Requirements 📋
- Node.js
- npm

## Technologies used 🟢
- Node.js
- Express
- MongoDB and mongoose
- Swagger documentation
- Winston logger
- Json Web Token (JWT) for authentication

## How to run the project 🛠
1. Clone the repository
2. Run `npm install` to install all the dependencies
3. Configure the environment variables in the `.env` file:
   ```
      MODE = development
      PORT = 8080
      PERSISTENCE = mongodb
      DEVELOPMENT_DB_URL = <MongoDBURL>
      PRIVATE_KEY = <EnterAPrivateKey>
   ``` 
4. Run `npm start` to start the server
5. Go to `http://localhost:8080/apidocs` to see the Swagger documentation

## User roles 🧑‍🤝‍🧑
- **ADMIN**: Can create and delete users, assign roles and permissions, and manage the information of the tugboats, crew, customers and ships.
- **CAPITAN**: The person responsible for the towing. They load the crew of the tugboat each day and create the maneuvers records specifying the tugboat, the ship, its flag, the customer, etc.
- **SUPERVISOR**: Monitors record information uploaded by the captain and prepares for billing.
- **CONTADOR**: Generates the billing of the services provided by the tugboats.
