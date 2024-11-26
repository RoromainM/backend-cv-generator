require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connection has been established successfully');
  })
  .catch((error) => {
    console.error('❌ Unable to connect to the database: ', error);
  });

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(3000, () => {
  console.log('🚀 Server is running on port 3000');
});
