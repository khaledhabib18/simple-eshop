# Simple E-Shop API

A RESTful e-commerce API built with **TypeScript**, **Express.js**, and **Prisma ORM** for practicing backend development skills. This project demonstrates modern TypeScript patterns, database modeling with Prisma, authentication/authorization, and clean architecture principles.

## 🚀 Features

-   **User Authentication**: Signup and login with JWT-based authentication
-   **Role-Based Access Control**: Admin and User roles with protected routes
-   **Product Management**: CRUD operations for products (Admin only)
-   **Address Management**: Users can have multiple addresses
-   **Input Validation**: Zod schema validation for request data
-   **Error Handling**: Centralized error handling with custom exception classes
-   **Type Safety**: Full TypeScript implementation with strict type checking

## 🛠️ Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Express.js 5.x
-   **Language**: TypeScript 5.x
-   **ORM**: Prisma 7.x
-   **Database**: PostgreSQL
-   **Authentication**: JWT (jsonwebtoken)
-   **Password Hashing**: bcrypt
-   **Validation**: Zod
-   **Development**: nodemon, ts-node

## 📁 Project Structure

```
simple-eshop/
├── prisma/
│   ├── migrations/          # Database migrations
│   └── schema.prisma        # Prisma schema definition
├── src/
│   ├── controllers/         # Request handlers
│   │   ├── auth.ts
│   │   └── products.ts
│   ├── repositories/        # Data access layer
│   │   ├── prisma.ts        # Prisma client instance
│   │   ├── productRepo.ts
│   │   └── userRepo.ts
│   ├── routes/              # API route definitions
│   │   ├── auth.ts
│   │   ├── products.ts
│   │   └── index.ts
│   ├── middlewares/         # Express middlewares
│   │   ├── auth.ts          # JWT authentication
│   │   ├── admin.ts         # Admin role check
│   │   └── errors.ts        # Error handling middleware
│   ├── schemas/             # Zod validation schemas
│   │   ├── products.ts
│   │   └── users.ts
│   ├── exceptions/          # Custom error classes
│   │   ├── root.ts
│   │   ├── bad-requests.ts
│   │   ├── not-found.ts
│   │   ├── unauthorized.ts
│   │   └── ...
│   ├── types/               # TypeScript type definitions
│   ├── generated/           # Generated Prisma client
│   │   └── prisma/
│   ├── secrets.ts           # Environment variables
│   ├── error-handler.ts     # Error handler wrapper
│   └── index.ts             # Application entry point
├── package.json
├── tsconfig.json
└── nodemon.json
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js** (v18 or higher)
-   **PostgreSQL** (v12 or higher)
-   **npm** or **yarn**

## 🔧 Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/khaledhabib18/simple-eshop.git
    cd simple-eshop
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the root directory:

    ```env
    DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
    PORT=3000
    JWT_SECRET="your-secret-key-here"
    ```

4. **Set up the database**

    Make sure PostgreSQL is running, then run migrations:

    ```bash
    npx prisma migrate dev
    ```

5. **Generate Prisma Client**
    ```bash
    npx prisma generate
    ```

## 🏃 Running the Project

### Development Mode

```bash
npm run dev
```

The server will start on the port specified in your `.env` file (default: 3000).

### Production Mode

```bash
npx tsx ./src/index.ts
```

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint           | Description           | Auth Required |
| ------ | ------------------ | --------------------- | ------------- |
| POST   | `/api/auth/signup` | Register a new user   | No            |
| POST   | `/api/auth/login`  | Login user            | No            |
| GET    | `/api/auth/me`     | Get current user info | Yes           |

### Product Routes (`/api/products`)

| Method | Endpoint            | Description                         | Auth Required | Admin Only |
| ------ | ------------------- | ----------------------------------- | ------------- | ---------- |
| GET    | `/api/products`     | List all products (with pagination) | Yes           | Yes        |
| GET    | `/api/products/:id` | Get product by ID                   | Yes           | Yes        |
| POST   | `/api/products`     | Create a new product                | Yes           | Yes        |
| PUT    | `/api/products/:id` | Update a product                    | Yes           | Yes        |
| DELETE | `/api/products/:id` | Delete a product                    | Yes           | Yes        |

### Request/Response Examples

#### Signup

```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "user": { ... },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Create Product (Admin only)

```bash
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "tags": ["electronics", "computers"]
}
```

## 🗄️ Database Schema

### User Model

-   `id`: UUID (Primary Key)
-   `name`: String
-   `email`: String (Unique)
-   `password`: String (Hashed)
-   `role`: Enum (ADMIN | USER) - Default: USER
-   `createdAt`: DateTime
-   `updatedAt`: DateTime
-   `addresses`: Address[] (One-to-Many)

### Address Model

-   `id`: UUID (Primary Key)
-   `lineOne`: String
-   `lineTwo`: String? (Optional)
-   `city`: String
-   `country`: String
-   `pinCode`: String
-   `userId`: String (Foreign Key)
-   `createdAt`: DateTime
-   `updatedAt`: DateTime

### Product Model

-   `id`: UUID (Primary Key)
-   `name`: String
-   `description`: String
-   `price`: Decimal
-   `tags`: String (Comma-separated)
-   `createdAt`: DateTime
-   `updatedAt`: DateTime

## 🔐 Authentication & Authorization

-   **JWT Tokens**: Used for authentication
-   **Bearer Token**: Include in Authorization header: `Authorization: Bearer <token>`
-   **Role-Based Access**:
    -   `USER`: Can access protected routes
    -   `ADMIN`: Can access all routes including product management

## 🎯 Key Learning Points

This project demonstrates:

1. **TypeScript Best Practices**

    - Strict type checking
    - Type-safe database queries with Prisma
    - Custom type definitions

2. **Prisma ORM**

    - Schema definition and migrations
    - Type-safe database access
    - Relationships (One-to-Many)
    - Custom Prisma client generation

3. **Express.js Architecture**

    - MVC-like structure (Controllers, Routes, Repositories)
    - Middleware pattern
    - Error handling middleware

4. **Security**

    - Password hashing with bcrypt
    - JWT token-based authentication
    - Role-based authorization

5. **Validation**

    - Request validation with Zod
    - Type-safe schema definitions

6. **Error Handling**
    - Custom exception classes
    - Centralized error handling
    - HTTP status code management

## 🧪 Development Notes

-   The Prisma client is generated to a custom location (`src/generated/prisma`)
-   Uses `@prisma/adapter-pg` for PostgreSQL connection pooling
-   TypeScript configured with strict mode and modern ES features
-   Development server uses `nodemon` with `tsx` for hot reloading

## 📝 Environment Variables

| Variable       | Description                  | Required           |
| -------------- | ---------------------------- | ------------------ |
| `DATABASE_URL` | PostgreSQL connection string | Yes                |
| `PORT`         | Server port number           | No (default: 3000) |
| `JWT_SECRET`   | Secret key for JWT signing   | Yes                |

## 🤝 Contributing

This is a practice project for learning TypeScript and Prisma. Feel free to fork, experiment, and learn from it!

## 📄 License

ISC

## 👤 Author

**khaledhabib18**

-   GitHub: [@khaledhabib18](https://github.com/khaledhabib18)

---

**Note**: This project is built for educational purposes to practice TypeScript and Prisma ORM skills.
