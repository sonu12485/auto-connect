const express = require('express');
const jwt = require("jsonwebtoken");

// Load the env variables
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;

const User = require("../db/schema/User");
const Driver = require("../db/schema/Driver");

const getAuthToken = require("../middleware/getAuthToken");

const router = express.Router();

router.post("/addMoney", getAuthToken, async (req,res) => {

    jwt.verify(req.token, SECRET, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          
            const { email, type } = authData;

            const {
                amount
            } = req.body;

            if( type === "user" )
            {
                try
                {
                    const user = await User.findOne({ email });

                    const userAccountBalance = user.money;
                    const userNewAccountBalance = userAccountBalance + amount;

                    await user.update("money", userNewAccountBalance);
                    
                    res.send("Money Transfer Done").sendStatus(200);
                }
                catch(err)
                {
                    res.send(err).sendStatus(500);
                }
            }
            else
            {
                res.sendStatus(403).send("Not a User");
            }
        }
      });
});

router.post("/transfer", getAuthToken, async (req,res) => {

    jwt.verify(req.token, SECRET, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          
            const { email, type } = authData;

            const {
                driverEmail,
                amount
            } = req.body;

            if( type === "user" )
            {
                try
                {
                    const user = await User.findOne({ email });
                    const driver = await Driver.findOne({ email: driverEmail });

                    const userAccountBalance = user.money;
                    const driverAccountBalance = driver.money;

                    if(userAccountBalance < amount)
                    {
                        res.send("Insufficient Balance").sendStatus(403);
                    }

                    const userNewAccountBalance = userAccountBalance - amount;
                    const driverNewAccountBalance = driverAccountBalance + amount;

                    await user.update("money", userNewAccountBalance);
                    await driver.update("money", driverNewAccountBalance);

                    res.send("Money Transfer Done").sendStatus(200);

                }
                catch(err)
                {
                    res.send(err).sendStatus(500);
                }
            }
            else
            {
                res.sendStatus(403).send("Not a User");
            }
        }
      });
});

module.exports = router;
