# ApiValidator

ApiValidator is a project aimed at developing a RESTful API with Express.js, focusing on thorough validation of incoming data for various routes. The project emphasizes the creation of comprehensive unit tests using Jest to ensure effective validation and proper functioning of each part of the API.

## Table of Contents

- [ApiValidator](#apivalidator)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Usage](#usage)
- [API Routes - /api/v1/products](#api-routes---apiv1products)
  - [Endpoints](#endpoints)
      - [GET /api/v1/products](#get-apiv1products)
      - [GET /api/v1/products/:id](#get-apiv1productsid)
      - [POST /api/v1/products](#post-apiv1products)
      - [PUT /api/v1/products/:id](#put-apiv1productsid)
      - [DELETE /api/v1/products/:id](#delete-apiv1productsid)
  - [Testing](#testing)
  - [Author](#author)
  - [Learn More](#learn-more)
  - [Contributing](#contributing)

## Features

- Create, Read, Update, and Delete (CRUD) operations for products
- Thorough validation of incoming data for each operation
- Detailed unit tests using Jest to validate the API endpoints

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose for ODM)
- Jest
- Joi

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/YNS-JNS/ApiValidator.git
```


2. Navigate to the project directory:

```bash
   cd ApiValidator
```


3. Install dependencies:

```bash
   npm install
```


4. Set up environment variables:

Create a `.env` file in the root directory and add the following variables:

```bash	
MONGODB_URI=<your-mongodb-uri>
PORT=<your-port>
USERNAME_MONGODB_ATLAS=<your-username>
PASSWORD_MONGODB_ATLAS=<your-password>
```


## Usage

- Once the server is running, you can use tools like Postman or any REST client to interact with the API endpoints.
- The API provides endpoints for creating, reading, updating, and deleting products. Ensure to provide valid data according to the specified validation rules.

# API Routes - /api/v1/products

This document provides a brief overview of the API routes available for interacting with products in the ApiValidator project.

## Endpoints

#### GET /api/v1/products
#### GET /api/v1/products/:id
#### POST /api/v1/products
#### PUT /api/v1/products/:id
#### DELETE /api/v1/products/:id

## Testing

Unit tests are implemented using Jest. To run the tests, use the following command:

```bash
npm test
```

## Author

This API was created ✨ by :
- ***[hossamdev](https://github.com/hossam-dev14).***
- ***[Lahoucine Ijioui](https://github.com/houssain-ijioui).***
- ***[AIT M'BAREK YOUNESS](https://github.com/YNS-JNS).***

## Learn More

- Node.js Documentation: [https://nodejs.org/docs/latest/api/](https://nodejs.org/docs/latest/api/)

## Contributing

If you find issues or want to contribute, follow these steps:

1. Fork the project.
2. Create a branch for your feature: `git checkout -b feature/NewFeature`.
3. Commit your changes: `git commit -m "Add New Feature"`.
4. Push to the branch: `git push origin feature/NewFeature`.
5. Open a pull request.