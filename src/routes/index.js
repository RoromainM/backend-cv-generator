const express = require('express');
const cvRouter = require('./cv');

const app = express();

app.use('/api/cv', cvRouter);

module.exports = app;
