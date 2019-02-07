const express = require("express");

const app = express();

// Load the env variables
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Backend for Autoconnect");
});

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
