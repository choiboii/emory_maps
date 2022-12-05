import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import express from 'express'
import mongoose from 'mongoose';
const app = express();
const PORT = process.env.PORT || 3000;

import cors from 'cors'

app.use(cors())

//  mondodb connect
mongoose
    .connect(
        process.env.MONGODB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


const userSchema = new mongoose.Schema({});

const a = [];

const Buildings = mongoose.model('Hello', userSchema, 'buildings');
const Entrances = mongoose.model('Hi', userSchema, 'entrances');
const ShuttleStops = mongoose.model('Hey', userSchema, 'shuttle-stops');
//const Entrances = mongoose.model('test', userSchema);
//const ShuttleStops = mongoose.model('test', userSchema);

app.get('/', (req, res) => {
    Buildings.find({}, (err, found) => {
        if (!err) {
            a[0] = found;
            //res.send(found);
        } else {
            console.log(err);
            res.send("Some error occured!")
        }
    }).clone().catch(err => console.log("Error occured, " + err));
    Entrances.find({}, (err, found) => {
        if (!err) {
            a[1] = found;
            //res.send(found);
        } else {
            console.log(err);
            res.send("Some error occured!")
        }
    }).clone().catch(err => console.log("Error occured, " + err));
    ShuttleStops.find({}, (err, found) => {
        if (!err) {
            a[2] = found;
            console.log(a);
            res.send(a);
        } else {
            console.log(err);
            res.send("Some error occured!")
        }
    }).clone().catch(err => console.log("Error occured, " + err));
});








//const Buildings = mongoose.model('test.buildings', userSchema);
//const Entrances = mongoose.model('test.entrances', userSchema);
//const ShuttleStops = mongoose.model('test.shuttle-stops', userSchema);



// get documents

// Server listen
//app.listen(3000, () => console.log(`Server listening to port 3000`));
app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));

