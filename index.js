const app = require('./app');
require('dotenv').config();
const connectWithDb = require('./config/database');
const cloudinary = require('cloudinary');

// connection with database
connectWithDb();

// configuring cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const {PORT} = process.env;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));