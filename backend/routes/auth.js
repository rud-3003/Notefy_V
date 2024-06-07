const express = require("express");
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require ('express-validator');

//Create a User using: POST "/api/auth". Doesn't require Auth
router.post("/",[
    body('name', 'Enter a valid Name').isLength({min: 3}),
    body('password', 'Password must be atleast 5 characters').isLength({min: 5}),
    body('email', 'Enter a valid Email Address').isEmail(),
], (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(user => res.json(user))
    .catch(
        res.json({error: 'Please enter a unique value for email', message: err.message})
    );
})

module.exports = router