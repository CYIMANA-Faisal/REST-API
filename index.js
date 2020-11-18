const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
mongoose.connect("mongodb+srv://cyimana:Cyfaisal1998@portfolio.pgjtx.mongodb.net/portfoliodb?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
app.use(bodyParser.json());
app.use('/api',require('./routes/api'));

app.listen(3000, () => {
    console.log("ready to accept requests")
});