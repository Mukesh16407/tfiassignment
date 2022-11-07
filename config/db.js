const mongoose = require("mongoose");

const server = () => {
  mongoose.connect(process.env.MONGO_URL);
  console.log("DB connected");
};

module.exports = server;