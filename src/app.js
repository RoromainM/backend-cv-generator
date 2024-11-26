require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Connection has been etablished successfully');
    })
    .catch((error) => {
        console.error('❌ Unable to connect database: ', error);
    });

app.listen(3000, () => {
    console.log('🚀 Server is running on port 3000');
});
    