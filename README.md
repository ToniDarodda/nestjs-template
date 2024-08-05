---

# NestJS Template

![NestJS](https://img.shields.io/badge/NestJS-7E1E9C?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FF7A59?style=for-the-badge&logo=typeorm&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![PNPM](https://img.shields.io/badge/PNPM-4D4D4D?style=for-the-badge&logo=pnpm&logoColor=white)
![License](https://img.shields.io/badge/License-LICENSED-green?style=for-the-badge)

This project is a NestJS template that includes various features such as user account management, authentication, authorization, email integration, caching, compression, centralized error handling, input validation, logging, scheduled tasks, and file upload to S3.

## Features

- 👤 **User Account Management**
  - Sign-up, Sign-in, Get user, Update user, Delete user
- 🔐 **Authentication and Authorization**
  - JWT-based authentication, role-based authorization
- ✉️ **Email Integration**
  - Send emails using Nodemailer
- 💾 **Caching**
  - Optimize responses for frequently requested endpoints
- ❌ **Centralized Error Handling**
  - Global exception filter to handle all errors consistently
- ✅ **Input Validation**
  - Validate user inputs using class-validator
- 📓 **Logging**
  - Log application activities and errors
- 🗂 **Compression**
  - Compress HTTP responses to improve performance
- ⏰ **Scheduled Tasks**
  - Perform periodic tasks using CRON jobs
- 📤 **File Upload to S3**
  - Upload and retrieve files from Amazon S3

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- Email service credentials (e.g., Gmail SMTP)
- AWS S3 credentials for file upload

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/ToniDarodda/NestMonolithTemplate.git
   cd NestMonolithTemplate
   ```

2. Install dependencies

   ```sh
   pnpm install
   ```

3. Update the `.env` file in the root directory and configure environment variables:
   ```sh
     EMAIL_PASS='Your password'
   ```


### Running the Application

1. Start the PostgreSQL database

2. Run the application

   ```sh
   pnpm run start:dev
   ```

3. The API will be available at `http://localhost:3000`

### API Documentation

The API documentation is available at `http://localhost:3000/api`.

## 📄 Usage

### User Account Management

- **🚪 Sign Up**

  ```http
  POST /account/sign-up
  ```

  Request Body:

  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "1234567890",
    "password": "password",
    "country": "USA"
  }
  ```

- **🔑 Sign In**

  ```http
  POST /account/sign-in
  ```

  Request Body:

  ```json
  {
    "email": "john.doe@example.com",
    "password": "password"
  }
  ```

- **👤 Get User Information**

  ```http
  GET /account
  ```

  Requires JWT Authentication and User Role

- **📝 Update User Information**

  ```http
  PATCH /account
  ```

  Requires JWT Authentication and User Role

  Request Body:

  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "1234567890",
    "country": "USA"
  }
  ```

- **🗑️ Delete User Account**

  ```http
  DELETE /account
  ```

  Requires JWT Authentication and User Role

### File Upload to S3

- **📤 Upload File**

  ```http
  POST /file/upload
  ```

  Requires JWT Authentication

  Request Body: Form-data with `file` field

- **📥 Get File**

  ```http
  GET /file/:fileName
  ```

  Requires JWT Authentication

## 🧪 Testing

To run the tests, use the following command:

```sh
pnpm run test
```

## 🛠️ Scripts

- `🔨 build`: Build the application
- `🧹 format`: Format the code using Prettier
- `🏃‍♂️ start`: Start the application
- `👨‍💻 start:dev`: Start the application in development mode
- `🐞 start:debug`: Start the application in debug mode
- `🚀 start:prod`: Start the application in production mode
- `🔍 lint`: Lint the code using ESLint
- `🧪 test`: Run the tests
- `📦 migration:generate`: Generate a new database migration
- `🚚 migration:run`: Run the database migrations
- `🕵️‍♂️ test:watch`: Run the tests in watch mode
- `📊 test:cov`: Run the tests and generate coverage report
- `🐛 test:debug`: Run the tests in debug mode
- `🧪 test:e2e`: Run end-to-end tests

## 📜 License

This project is licensed under the UNLICENSED License.

## 👤 Author

[Toni Da Rodda](mailto:toni.da.rodda.pro@gmail.com)

## 🛠️ Icons

- 🚀 Deployment
- ⚙️ Configuration
- 📄 Documentation
- 🔧 Maintenance
- 🔒 Security
- 📫 Email Integration
- 📈 Performance Optimization
- ⚡ Gain Time

---

Feel free to contribute to this project by submitting issues or pull requests.

For any questions or support, please contact [Toni Da Rodda](mailto:toni.da.rodda.pro@gmail.com).

---
