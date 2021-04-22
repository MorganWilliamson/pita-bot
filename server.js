require("dotenv").config();
const express = require("express");
const server = express();
const port = process.env.PORT || 8000;

server.get("/", (req, res) => {
    res.send("Hello World!");
});

server.listen(port, () => {
    console.log(`Test server listening at http://localhost:${port} . . .`);
});