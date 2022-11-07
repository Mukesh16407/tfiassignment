const express = require("express");
const server  = require('./config/db.js');

require("dotenv").config();
const path = require("path");
// middlewares
const app = express();
app.use(express.json());

//port
const PORT = process.env.PORT || 5000;

//heroku
if (process.env.NODE_ENV === "production") {
    app.use("/", express.static("client/build"));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client/build/index.html"));
    });
  }
  
  app.get("/", (req, res) => res.send("Hello World!"));

// server started
app.listen(PORT, async () => {
    try {
      await server();
      console.log(`Server has started on PORT: ${PORT}`);
    } catch (err) {
      console.log(err.message);
    }
  });