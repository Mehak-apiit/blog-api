# Blog Backend API

A RESTful backend API for a Blog Website / Application built using Node.js, Express.js, and MongoDB.  
This project follows a clean MVC architecture with proper authentication, authorization, and modular code structure.

# Features

- User authentication using JWT
- Role-based access control (Admin / User)
- Blog management (CRUD)
- Blog like functionality
- Comment system
- Category management
- Image upload using Multer & Cloudinary
- Centralized error handling

# Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (JSON Web Token)
- Multer
- Cloudinary
- bcryptjs
- dotenv

# Project Structure


# Authentication & Authorization

- User login and registration using JWT
- Protected routes using authentication middleware
- Admin-only routes secured using role-based middleware

# Image Upload

- Image uploads handled using Multer
- Images stored on Cloudinary
- Only valid image formats allowed

# Environment Variables

Create a .env file in the root directory:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# HOW TO RUN THE PROJECT
npm install
npm run dev
 
 
# API Style
RESTful APIs
JSON responses
Proper status codes
Centralized error handling

# AUTHOR
Mehak
Backend developer(Node.js | Express.js | MongoDB)


