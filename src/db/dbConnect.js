require("dotenv").config();
const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
      () => {
        console.log("DB Connected");
      },
      (err) => {
        console.log("Error in db connection:", err.reason);
      }
    );
};

module.exports = dbConnection;
