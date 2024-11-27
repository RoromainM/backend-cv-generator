const express = require('express');
const cvRouter = require('./cv');
const authRouter = require('./auth');
const recommandationRouter = require('./recommandation');

const app = express();

app.use('/cv', cvRouter);
app.use('/auth', authRouter);
app.use('/recommandation', recommandationRouter);

module.exports = app;
