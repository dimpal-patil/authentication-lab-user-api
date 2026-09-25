# User Authentication API

A simple REST API built with **Node.js, Express, MongoDB, and Mongoose** that provides user registration and login functionality using **bcrypt** for password hashing and **JWT** for authentication.

## Features

* User registration
* Password hashing with bcrypt
* Prevents duplicate email registration
* User login
* Password validation
* JWT token generation
* Password excluded from API responses

## Technologies

* Node.js
* Express
* MongoDB
* Mongoose
* bcrypt
* jsonwebtoken
* dotenv

## Installation

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
npm run dev
```

Or:

```bash
node server.js
```

## API Endpoints

### Register

**POST** `/api/users/register`

Request:

```json
{
  "username": "dimpal",
  "email": "dimpal@example.com",
  "password": "password123"
}
```

Creates a new user and securely hashes the password before saving it.

### Login

**POST** `/api/users/login`

Request:

```json
{
  "email": "dimpal@example.com",
  "password": "password123"
}
```

Returns a signed JWT and user information.

Example response:

```json
{
  "token": "your.jwt.token",
  "user": {
    "_id": "user_id",
    "username": "dimpal",
    "email": "dimpal@example.com"
  }
}
```

## Error Handling

If the email is already registered:

```json
{
  "message": "User with this email already exists"
}
```

If login credentials are incorrect:

```json
{
  "message": "Incorrect email or password."
}
```

## Security

* Passwords are never stored as plain text.
* Passwords are hashed using bcrypt.
* JWT secrets are stored in environment variables.
* `.env` should not be committed to GitHub.

## Testing

Use **Postman** to test the registration and login endpoints.
