const express = require('express');
const routes = require('./routes/index')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
mongoose.connect(process.env.dbConnection, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
app.use(bodyParser.json());
app.use('/api',routes);

app.listen(3000, () => {
    console.log("ready to accept requests")
});