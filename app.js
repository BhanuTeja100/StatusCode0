require('dotenv').config();

const express = require('express');
const app = express();


const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

// ejs middleware
app.set('view engine', 'ejs');
app.use(express.static("public"));

// regular middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// cookies and file upload middleware
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

// morgan middleware
app.use(morgan('tiny'));

// importing routes here
const user = require('./routes/user');
const home = require('./routes/home');
const company = require('./routes/company');
const institute = require('./routes/institute');

// router middleware
app.use('/api/v1', user);
app.use('/api/v1', home);
app.use('/api/v1', company);
app.use('/api/v1', institute);


// exporting app
module.exports = app;