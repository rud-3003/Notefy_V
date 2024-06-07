const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const JWT_SECRET = 'Thereoncewasaship$'

//Route 1
//Create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post("/createuser", [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('email', 'Enter a valid Email Address').isEmail(),
], async (req, res) => {
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //Check whether user with this email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "A User with this email already exists" });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            // Create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            });
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);

            // res.json(user)
            res.json({ authToken: authToken });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

//Route 2 
// Authenticating a user using: POST "/api/auth/login" No Login required
router.post("/login", [
    body('email', 'Enter a valid Email Address').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Incorrect Username or Password" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Incorrect Username or Password" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        // res.json(user)
        res.json({ authToken: authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
})

module.exports = router