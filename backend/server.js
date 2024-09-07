const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();
const connectToMongo = require('./db.js');

// Connect to MongoDB
connectToMongo();

const app = express();
const port = process.env.PORT || 8000;

// Body parser middleware to handle large payloads
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Dynamic CORS Middleware Setup
const allowedOrigins = [
    'http://localhost:3000',              // Local development frontend
    'https://notefy-v.vercel.app'          // Production frontend on Vercel
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (e.g., mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true,
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
