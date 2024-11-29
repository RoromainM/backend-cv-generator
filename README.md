# backend-cv-generator

Backend API
This is the backend API for a full-stack application. It is built with Node.js, Express, and MongoDB, and is deployed on Railway.

Features
User authentication (JWT-based)
CRUD operations for CV management
Integration with MongoDB Atlas
Getting Started
Prerequisites
Node.js installed on your local machine
MongoDB Atlas account (or local MongoDB setup)
Installation
Clone this repository:

cd your-backend-repo
Install the required dependencies:

npm install
Create a .env file in the root directory and add the following environment variables:

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
PORT=3003
Start the development server:

npm run start:dev
The server will run on http://localhost:3000/.

Deployment
Railway Deployment
Push your repository to GitHub if you haven't done so already.

Go to Railway.app and create a new project.

Select Deploy from GitHub repo and choose your repository.

In Railway, go to the Environment Variables section and add the necessary variables:

MONGO_URI
JWT_SECRET
PORT (optional)
Railway will automatically build and deploy your backend.

API Endpoints
PUT /api/auth/profile/edit: Edit user profile
Built With
Node.js
Express
MongoDB
Railway
License
This project is licensed under the MIT License.


Participant :

- Huu-Nghia TRAN
- Romain MONMARCHE
- HADDOUCHE Othmane
