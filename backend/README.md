
# NexusShop Backend API

This is the backend API for the NexusShop e-commerce application.

## Setup

1. Install dependencies:
   ```
   cd backend
   npm install
   ```

2. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/nexusshop
   JWT_SECRET=your_jwt_secret
   ```

3. Start the server:
   ```
   npm start
   ```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login a user

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get a single product
- POST `/api/products/init` - Initialize sample products
