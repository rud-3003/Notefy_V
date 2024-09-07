const connectToMongo = require('./db.js');
const express = require("express")
const bodyParser = require('body-parser');
require('dotenv').config();

var cors = require("cors")

connectToMongo();
const app = express()
const port = process.env.PORT;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin: "https://notefy-v.vercel.app",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Date', 'X-Api-Version'],
}));

app.options('*', cors());
app.options('/api/*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://notefy-v.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.status(200).end();
});

app.use(express.json())

//Available Routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes', require('./routes/notes.js'));

app.listen(port, () => {
    console.log(`Notefy App listening at http://localhost:${port}`);
})
