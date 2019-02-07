const express = require("express");
const morgan = require("morgan");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(morgan('combined'));

// Load the env variables
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const SECRET = process.env.JWT_SECRET;

mongoose.Promise = global.Promise;
mongoose
  .connect(
    MONGO_URI,
    {
      useNewUrlParser: true
    }
  )
  .then(
    () => {
      console.log("Connected to MongoDB successfully");
    },
    err => {
      console.log("Error in connecting to MongoDB" + err);
    }
  );

app.use(bodyParser.json());

const User = require("./db/schema/User");

app.get("/", (req, res) => {
    res.send("Backend for Autoconnect");
});

app.post("/login", async (req,res) => {
    const {
        email,
        profilePic,
        firstName,
        lastName
    } = req.body;

    try
    {
        const user = await User.findOne({ email });

        if(!user)
        {
            const newUser = new User({
                email,
                profilePic,
                firstName,
                lastName
            });

            const result = await newUser.save();
        }

        const token = jwt.sign({ email }, SECRET, {
            expiresIn: "1d"
        });

        const expiresIn = Number(Date.now()) + 86400;

        res.json({
            token,
            expiresIn
        }).sendStatus(200);
    }
    catch(err)
    {
        res.sendStatus(500).send("Server Error");
    }

});

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
