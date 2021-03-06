require("dotenv").config();
const express = require("express");
var cors = require('cors')
const dbConnection = require("./src/db/dbConnect");
dbConnection();
const deviceSchema = require("./src/routes/devices");
const userSchema = require("./src/routes/users");

const app = express();
app.use(cors())
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/devices", deviceSchema);
app.use("/api/users", userSchema);

app.get("/", (req, res) => res.send("Connect World!"));

app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));
