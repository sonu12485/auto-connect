const express = require('express');
const jwt = require("jsonwebtoken");

// Load the env variables
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;

const User = require("../db/schema/User");

const getAuthToken = require("../middleware/getAuthToken");

const router = express.Router();

router.get("/user", getAuthToken, async (req,res) => {

    jwt.verify(req.token, SECRET, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          
            const email = authData.email;

            try
            {
                const user = await User.findOne({ email });

                if(user)
                {
                    res.json({
                        email: user.email,
                        name: user.name,
                        profilePic: user.profilePic
                    }).sendStatus(200);
                }
                else
                {
                    res.sendStatus(404);
                }
            }
            catch(err)
            {
                console.log(err);
                res.sendStatus(500);
            }
        }
      });
});

module.exports = router;
