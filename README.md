# ApiValidator

ApiValidator is a project aimed at developing a RESTful API with Express.js, focusing on thorough validation of incoming data for various routes. The project emphasizes the creation of comprehensive unit tests using Jest to ensure effective validation and proper functioning of each part of the API.

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
   git clone git https://github.com/M-ZAKHBAT/ApiValidator.git
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
```

## Usage

- Once the server is running, you can use tools like Postman or any REST client to interact with the API endpoints.
- The API provides endpoints for creating, reading, updating, and deleting products. Ensure to provide valid data according to the specified validation rules.

## Testing

Unit tests are implemented using Jest. To run the tests, use the following command:

```bash
npm test
```

## Author

This API was created 👌 by :

- **_[ZAKHBAT Mohammed](https://github.com/M-ZAKHBAT)._**

## Learn More

- Node.js Documentation: [https://nodejs.org/docs/latest/api/](https://nodejs.org/docs/latest/api/)
