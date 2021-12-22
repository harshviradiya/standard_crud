const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser')
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();
require("./db/connection");

const app = express();
const port = process.env.PORT || 8000;

app.use(logger('tiny'));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

app.listen(port, () => {
    console.log(`you are now port number on ${port}`);
});
