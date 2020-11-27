const express = require('express');
const routes = require('./routes/index')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
mongoose.connect(process.env.dbConnection, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api',routes);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`The server is running on PORT ${PORT}`)
});