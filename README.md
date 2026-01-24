# Simple E-Shop API

A RESTful e-commerce API built with **TypeScript**, **Express.js**, and **Prisma ORM** for practicing backend development skills. This project demonstrates modern TypeScript patterns, database modeling with Prisma, authentication/authorization, and clean architecture principles.

## 🚀 Features

- **User Authentication**: Signup and login with JWT-based authentication
- **Role-Based Access Control**: Admin and User roles with protected routes
- **Product Management**: CRUD operations for products (Admin only)
- **Address Management**: Users can have multiple addresses
- **Input Validation**: Zod schema validation for request data
- **Error Handling**: Centralized error handling with custom exception classes
- **Type Safety**: Full TypeScript implementation with strict type checking

## 🛠️ Tech Stack

<img src="https://skillicons.dev/icons?i=nodejs,express,ts,prisma,postgres,vscode" />

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js 5.2.1
- **Language**: TypeScript 5.9.3
- **ORM**: Prisma 7.2.0 with PostgreSQL Adapter
- **Database**: PostgreSQL (v12+)
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Password Hashing**: bcrypt 6.0.0
- **Validation**: Zod 4.3.5
- **File Upload**: multer 2.0.2
- **CORS**: cors 2.8.5
- **Development**: nodemon 3.1.11, ts-node 10.9.2

## 📁 Project Structure

```
simple-eshop/
├── prisma/
│   ├── migrations/          # Database migrations (13 total)
│   ├── schema.prisma        # Prisma schema definition
│   └── config.ts            # Prisma config file
├── public/
│   └── uploads/             # File upload directory
├── src/
│   ├── controllers/         # Request handlers
│   │   ├── auth.ts          # Authentication logic
│   │   ├── cart.ts          # Cart management
│   │   ├── order.ts         # Order processing
│   │   ├── products.ts      # Product operations
│   │   └── users.ts         # User management
│   ├── repositories/        # Data access layer
│   │   ├── prisma.ts        # Prisma client instance
│   │   ├── addressRepo.ts   # Address operations
│   │   ├── productRepo.ts   # Product queries
│   │   └── userRepo.ts      # User queries
│   ├── routes/              # API route definitions
│   │   ├── auth.ts          # /api/auth routes
│   │   ├── cart.ts          # /api/cart routes
│   │   ├── order.ts         # /api/order routes
│   │   ├── products.ts      # /api/products routes
│   │   ├── users.ts         # /api/user routes
│   │   └── index.ts         # Route aggregation
│   ├── middlewares/         # Express middlewares
│   │   ├── auth.ts          # JWT authentication
│   │   ├── admin.ts         # Admin role verification
│   │   ├── errors.ts        # Error handling middleware
│   │   └── uploadBodyParser.ts # Multipart form data
│   ├── schemas/             # Zod validation schemas
│   │   ├── cart.ts          # Cart validation
│   │   ├── products.ts      # Product validation
│   │   └── users.ts         # User validation
│   ├── exceptions/          # Custom error classes
│   │   ├── root.ts          # Base exception
│   │   ├── bad-requests.ts  # 400 errors
│   │   ├── not-found.ts     # 404 errors
│   │   ├── unauthorized.ts  # 401 errors
│   │   ├── internal-exception.ts # 500 errors
│   │   └── validation.ts    # Validation errors
│   ├── types/               # TypeScript type definitions
│   │   ├── express.d.ts     # Express extensions
│   │   └── jsonwebtoken.d.ts # JWT type augmentation
│   ├── utils/               # Utility functions
│   │   ├── multer.ts        # File upload config
│   │   └── safeDeleteFiles.ts # File cleanup
│   ├── generated/           # Generated Prisma client
│   │   └── prisma/          # Prisma type definitions
│   ├── secrets.ts           # Environment configuration
│   ├── error-handler.ts     # Async error wrapper
│   └── index.ts             # Application entry point
├── tests/
│   └── setup.test.ts        # Test setup
├── package.json
├── tsconfig.json
├── nodemon.json
└── README.md
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn**

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

| Method | Endpoint            | Description          | Auth Required | Admin Only |
| ------ | ------------------- | -------------------- | ------------- | ---------- |
| GET    | `/api/products`     | List all products    | Yes           | No         |
| GET    | `/api/products/:id` | Get product by ID    | Yes           | No         |
| POST   | `/api/products`     | Create a new product | Yes           | Yes        |
| PUT    | `/api/products/:id` | Update a product     | Yes           | Yes        |
| DELETE | `/api/products/:id` | Delete a product     | Yes           | Yes        |

### Address Routes (`/api/user/address`)

| Method | Endpoint                | Description             | Auth Required |
| ------ | ----------------------- | ----------------------- | ------------- |
| POST   | `/api/user/address`     | Add a new address       | Yes           |
| GET    | `/api/user/address`     | List all user addresses | Yes           |
| DELETE | `/api/user/address/:id` | Delete an address       | Yes           |

### Cart Routes (`/api/cart`)

| Method | Endpoint        | Description               | Auth Required |
| ------ | --------------- | ------------------------- | ------------- |
| POST   | `/api/cart`     | Add item to cart          | Yes           |
| GET    | `/api/cart`     | Get user cart             | Yes           |
| PUT    | `/api/cart/:id` | Change cart item quantity | Yes           |
| DELETE | `/api/cart/:id` | Remove item from cart     | Yes           |

### User Routes (`/api/user`)

| Method | Endpoint    | Description      | Auth Required |
| ------ | ----------- | ---------------- | ------------- |
| PUT    | `/api/user` | Update user info | Yes           |

### Order Routes (`/api/order`)

| Method | Endpoint         | Description         | Auth Required | Admin Only |
| ------ | ---------------- | ------------------- | ------------- | ---------- |
| POST   | `/api/order`     | Create a new order  | Yes           | No         |
| GET    | `/api/order`     | Get user orders     | Yes           | No         |
| GET    | `/api/order/:id` | Get order details   | Yes           | No         |
| PUT    | `/api/order/:id` | Update order status | Yes           | Yes        |
| DELETE | `/api/order/:id` | Cancel order        | Yes           | No         |

## 🗄️ Database Schema

### User Model

- `id`: UUID (Primary Key)
- `name`: String
- `email`: String (Unique)
- `password`: String (Hashed with bcrypt)
- `role`: Enum (ADMIN | USER) - Default: USER
- `defaultShippingAddressId`: String? (Optional)
- `defaultBillingAddressId`: String? (Optional)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- `addresses`: Address[] (One-to-Many)
- `cartItems`: CartItem[] (One-to-Many)

### Address Model

- `id`: UUID (Primary Key)
- `lineOne`: String
- `lineTwo`: String? (Optional)
- `city`: String
- `country`: String
- `pinCode`: String
- `userId`: String (Foreign Key)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Product Model

- `id`: UUID (Primary Key)
- `name`: String
- `description`: String
- `price`: Float (Decimal)
- `inStock`: Integer
- `images`: String[] (Array of image URLs)
- `tags`: String (Comma-separated)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- `cartItems`: CartItem[] (One-to-Many)
- `orderProducts`: OrderProduct[] (One-to-Many)

### CartItem Model

- `id`: UUID (Primary Key)
- `userId`: String (Foreign Key)
- `user`: User (Many-to-One)
- `productId`: String (Foreign Key)
- `product`: Product (Many-to-One)
- `quantity`: Integer
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Order Model

- `id`: UUID (Primary Key)
- `userId`: String (Foreign Key)
- `user`: User (Many-to-One)
- `netAmount`: Decimal
- `address`: String (Shipping address)
- `status`: Enum (PENDING | PROCESSING | SHIPPED | DELIVERED | CANCELLED) - Default: PENDING
- `createdAt`: DateTime
- `updatedAt`: DateTime
- `orderProducts`: OrderProduct[] (One-to-Many)
- `orderEvents`: OrderEvent[] (One-to-Many)

### OrderProduct Model

- `id`: UUID (Primary Key)
- `orderId`: String (Foreign Key)
- `order`: Order (Many-to-One)
- `productId`: String (Foreign Key)
- `product`: Product (Many-to-One)
- `quantity`: Integer
- `createdAt`: DateTime
- `updatedAt`: DateTime

### OrderEvent Model

- `id`: UUID (Primary Key)
- `orderId`: String (Foreign Key)
- `order`: Order (Many-to-One)
- `status`: Enum (PENDING | PROCESSING | SHIPPED | DELIVERED | CANCELLED) - Default: PENDING
- `createdAt`: DateTime
- `updatedAt`: DateTime

## 🧪 Error Handling

The application uses custom exception classes for consistent error handling:

- **BadRequest**: 400 - Invalid input or validation errors
- **NotFound**: 404 - Resource not found
- **Unauthorized**: 401 - Authentication failed or insufficient permissions
- **InternalException**: 500 - Server errors
- **ValidationException**: 422 - Validation errors with field details

All errors are caught by the centralized error middleware and returned in a consistent JSON format.

## 📝 Environment Variables

| Variable       | Description                          | Required           | Example                                            |
| -------------- | ------------------------------------ | ------------------ | -------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string         | Yes                | `postgresql://user:password@localhost:5432/dbname` |
| `PORT`         | Server port number                   | No (default: 3000) | `3000`                                             |
| `JWT_SECRET`   | Secret key for JWT signing           | Yes                | `your-secret-key-at-least-32-chars`                |
| `NODE_ENV`     | Environment (development/production) | No (default: dev)  | `development` or `production`                      |

## 🔧 Troubleshooting

### Database Connection Issues

**Problem**: `Error: Could not connect to the database server at ...`

**Solution**:

- Ensure PostgreSQL is running: `pg_isready`
- Check DATABASE_URL in `.env` file
- Verify PostgreSQL credentials and database exists
- Run migrations: `npx prisma migrate deploy`

### Migration Issues

**Problem**: `Migration failed` or `Schema drift detected`

**Solution**:

```bash
# Check migration status
npx prisma migrate status

# Resolve drift (development only)
npx prisma migrate resolve --rolled-back <migration-name>

# Reset database (development only - data loss!)
npx prisma migrate reset
```

### JWT Token Errors

**Problem**: `Invalid token` or `Token expired`

**Solution**:

- Ensure JWT_SECRET is set correctly in `.env`
- Token format: `Authorization: Bearer <token>`
- Generate new token by logging in again

### Type Generation Issues

**Problem**: Type errors in generated Prisma types

**Solution**:

```bash
# Regenerate Prisma client
npx prisma generate

# Clear node_modules and reinstall
rm -r node_modules
npm install
```

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:

- Change PORT in `.env` file
- Or kill the process: `lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9`

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

### Architecture

- **MVC-like structure** with Controllers, Routes, and Repositories for clean separation of concerns
- **Custom error handler wrapper** (`error-handler.ts`) for async route handlers to prevent unhandled promise rejections
- **Custom exception classes** in `src/exceptions/` for type-safe error handling
- **Centralized error middleware** for consistent error responses across the API

### TypeScript & Prisma Setup

- Prisma client generated to custom location: `src/generated/prisma` (not `node_modules`)
- Uses `@prisma/adapter-pg` for PostgreSQL connection pooling
- TypeScript strict mode enabled (`strict: true`)
- ES2020 target with modern module support
- 13 database migrations tracked in `prisma/migrations/`

### Development Server & Hot Reload

- **nodemon** watches file changes and restarts with `ts-node` compiler
- Run development server: `npm run dev`
- Configuration in `nodemon.json`

### Validation & Input Handling

- **Zod schemas** for type-safe request validation
- Schema definitions in `src/schemas/`
- Real-time validation on request input with error details
- Multipart form data handling via custom `uploadBodyParser` middleware

### File Uploads

- Static file uploads served from `/public/uploads` endpoint
- **Multer** configured for handling multipart form data
- Safe file deletion utilities in `src/utils/safeDeleteFiles.ts`

### Database Management

- Create/apply migrations: `npx prisma migrate dev --name <migration-name>`
- Check migration status: `npx prisma migrate status`
- Visual database management: `npx prisma studio`
- Reset database (dev only): `npx prisma migrate reset`

## 📝 Environment Variables

| Variable       | Description                          | Required           | Example                                            |
| -------------- | ------------------------------------ | ------------------ | -------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string         | Yes                | `postgresql://user:password@localhost:5432/dbname` |
| `PORT`         | Server port number                   | No (default: 3000) | `3000`                                             |
| `JWT_SECRET`   | Secret key for JWT signing           | Yes                | `your-secret-key-at-least-32-chars`                |
| `NODE_ENV`     | Environment (development/production) | No (default: dev)  | `development` or `production`                      |

## 🤝 Contributing

This is a practice project for learning TypeScript and Prisma. Feel free to:

- Fork and experiment
- Create feature branches: `git checkout -b feature/your-feature`
- Submit pull requests with detailed descriptions
- Report issues and suggest improvements

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Express.js Guide](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zod Validation](https://zod.dev/)
- [JWT.io](https://jwt.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 📄 License

ISC

## 👤 Author

**khaledhabib18**

- GitHub: [@khaledhabib18](https://github.com/khaledhabib18)
- Repository: [simple-eshop](https://github.com/khaledhabib18/simple-eshop)

---

**Note**: This project is built for educational purposes to practice TypeScript and Prisma ORM skills. Not intended for production use without additional security hardening.
