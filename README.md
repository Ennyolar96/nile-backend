# Nile Payout System API

A comprehensive RESTful API for Nile's internal payout system built with NestJS, TypeScript, and SQLite.

## Features

- **Vendor Management**: Create, read, update, and delete vendors
- **Order Management**: Full CRUD operations for orders
- **Payout Calculation**: Automated payout calculation with platform fees
- **Authentication**: JWT-based authentication system
- **API Documentation**: Swagger/OpenAPI documentation
- **Database**: SQLite with TypeORM
- **Validation**: Input validation with class-validator
- **Error Handling**: Comprehensive error handling

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Vendors
- `GET /vendors` - Get all vendors
- `POST /vendors` - Create a new vendor
- `GET /vendors/:id` - Get vendor by ID
- `PATCH /vendors/:id` - Update vendor
- `DELETE /vendors/:id` - Delete vendor

### Orders
- `GET /orders` - Get all orders
- `POST /orders` - Create a new order
- `GET /orders/:id` - Get order by ID
- `PATCH /orders/:id` - Update order
- `DELETE /orders/:id` - Delete order

### Payouts
- `GET /payouts/vendor/:vendorId` - Get payout summary for vendor

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL=./nile_payout.db
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   NODE_ENV=development
   ```

4. Start the application:
   ```bash
   # Development
   npm run start:dev

   # Production
   npm run build
   npm run start:prod
   ```

### API Documentation

Once the application is running, you can access the Swagger documentation at:
- http://localhost:5000/api/docs

### Testing the API

1. **Register a user**:
   ```bash
   curl -X POST http://localhost:5000/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "username": "testuser",
       "email": "test@example.com",
       "password": "password123"
     }'
   ```

2. **Login to get JWT token**:
   ```bash
   curl -X POST http://localhost:5000/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "username": "testuser",
       "password": "password123"
     }'
   ```

3. **Create a vendor** (use the JWT token from login):
   ```bash
   curl -X POST http://localhost:5000/vendors \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{
       "name": "DenimMuse",
       "bank_account": "1234567890",
       "email": "denimmuse@example.com",
       "store_name": "DenimMuse Store"
     }'
   ```

4. **Create orders** (use vendor ID from previous response):
   ```bash
   curl -X POST http://localhost:5000/orders \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{
       "order_id": "ORD-001",
       "amount": 25000,
       "status": "completed",
       "timestamp": "2024-01-15T10:00:00Z",
       "vendor_id": "VENDOR_UUID"
     }'
   ```

5. **Get payout summary**:
   ```bash
   curl -X GET http://localhost:5000/payouts/vendor/VENDOR_UUID \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

## Architecture

### Project Structure
```
src/
├── app/
  ├── auth/                 # Authentication module
  │   ├── dto/             # Data Transfer Objects
  │   ├── entities/        # Database entities
  │   ├── guards/          # Auth guards
  │   ├── strategies/      # Passport strategies
  │   └── ...
  ├── orders/             # Orders module
  ├── payouts/            # Payouts module
  ├── vendors/            # Vendors module
├── common/              # Shared utilities
│   ├── decorators/      # Custom decorators
│   ├── enums/          # Enums
│   └── filters/        # Exception filters
└── main.ts            # Application bootstrap
```

### Key Technologies
- **NestJS**: Progressive Node.js framework
- **TypeORM**: Object-Relational Mapping
- **SQLite**: Lightweight database
- **Passport.js**: Authentication middleware
- **JWT**: JSON Web Tokens
- **Swagger**: API documentation
- **Class-validator**: Input validation

### Security Features
- JWT authentication
- Password hashing with bcrypt
- Input validation and sanitization
- SQL injection prevention through TypeORM
- CORS enabled

## Development

### Available Scripts
- `npm run start:dev` - Start in development mode
- `npm run start:prod` - Start in production mode
- `npm run build` - Build the application
- `npm run test` - Run tests
- `npm run lint` - Run linting

### Database
The application uses SQLite with TypeORM. The database file (`nile_payout.db`) will be created automatically when you first run the application.

### Environment Variables
- `DATABASE_URL`: Database connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Application port (default: 5000)
- `NODE_ENV`: Environment (development/production)

## License

This project is part of the Nile Backend Internship technical test.
# nile-backend
