const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://admin:<@abel0706>@cluster0.cwoexh3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;