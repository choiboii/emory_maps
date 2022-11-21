const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://admin:emorymaps2022@aws-emorymaps-db.tj1y7al.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get('/message', (req, res) => {
    res.json({message: "Hello from server!"});
});

app.listen(8000, () => {
    console.log('Server is running on port 8000.');
});