import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import express from 'express'
import mongoose from 'mongoose';
const app = express () ;

import cors from 'cors'

app.use(cors())

//  mondodb connect
mongoose
.connect(
    process.env.MONGODB_URI, 
    {useNewUrlParser: true, useUnifiedTopology: true}
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));


const userSchema = new mongoose.Schema({});
const User = mongoose.model('Hello', userSchema, 'buildings');



// get documents
app.get('/', (req, res) => {
    User.find({}, (err, found) => {
        if (!err) {
            res.send(found);
        } else {
            console.log(err);
            res.send("Some error occured!")
        } 
    }).clone().catch(err => console.log("Error occured, " + err));
});

// Server listen
app.listen(3000, () => console.log("Server listening to port 3000"));

