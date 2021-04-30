const express = require("express");
const User = require("../models/users");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error is finding users");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(404).send("User not found");
  }
});

router.get("/status/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(device.isActive);
  } catch (error) {
    console.error(error);
    res.status(404).send("User status not found");
  }
});
router.post("/device/:id", async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(404).send("Device status not found");
  }
});

//Create a new user
router.post("/", async (req, res) => {
  //check if devices are up to 10

  try {
    const user = new User({
      ...req.body,
    });
    await user.save();
    res.send({
      status: "Ok",
      msg: "Created successfully",
      info: user,
    });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

module.exports = router;
