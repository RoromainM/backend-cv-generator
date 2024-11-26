const express = require('express');
const cvRouter = require('./cv');
const authRouter = require('./auth');

const app = express();

app.use('/cv', cvRouter);
app.use('/auth', authRouter);

module.exports = app;
