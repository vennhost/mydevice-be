require("dotenv").config();
const express = require("express");
const dbConnection = require("./src/db/dbConnect");
dbConnection();
const deviceSchema = require("./src/routes/devices");
const userSchema = require("./src/routes/users");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/devices", deviceSchema);
app.use("/api/users", userSchema);

app.listen(PORT, console.log(`Server running on Port: ${PORT}`));
