const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();
const connectToMongo = require('./db.js');

// Connect to MongoDB
connectToMongo();

const app = express();
const port = process.env.PORT;

// Body parser middleware to handle large payloads
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// CORS Middleware Setup
app.use(cors({
    origin: "https://notefy-v.vercel.app",  // Frontend URL
    methods: "GET,POST,PUT,DELETE,OPTIONS", // Allowed HTTP methods
    credentials: true,                      // Include credentials in requests
    allowedHeaders: [
        'Content-Type', 'Authorization', 'X-CSRF-Token', 
        'X-Requested-With', 'Accept', 'Accept-Version', 
        'Content-Length', 'Content-MD5', 'Date', 'X-Api-Version'
    ]
}));

// Serve routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes', require('./routes/notes.js'));

// Start the server
app.listen(port, () => {
    console.log(`Notefy App listening at http://localhost:${port}`);
});
