const express = require('express');
const jwt = require("jsonwebtoken");

// Load the env variables
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;

const User = require("../db/schema/User");

const router = express.Router();

router.post("/login/user", async (req,res) => {
    const {
        email,
        profilePic,
        name
    } = req.body;

    try
    {
        const user = await User.findOne({ email });

        if(!user)
        {
            const newUser = new User({
                email,
                profilePic,
                name
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

module.exports = router;
