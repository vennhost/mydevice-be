const express = require("express");
const Device = require("../models/devices");
const User = require("../models/users");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const devices = await Device.find({});
    res.send(devices);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error is finding devices");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    res.send(device);
  } catch (error) {
    console.error(error);
    res.status(404).send("Device not found");
  }
});

router.get("/status/:id", async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    res.send(device.isCheckedOut);
  } catch (error) {
    console.error(error);
    res.status(404).send("Device status not found");
  }
});
router.post("/uncheckout/:id", async (req, res) => {
  try {
    const device = await Device.findByIdAndUpdate(
      req.params.id,
      {
        isCheckedOut: false,
        lastCheckedOutDate: "",
        lastCheckedOutBy: "",
      },
      { new: true }
    );
    res.status(200).send("Device retrieved");
  } catch (error) {
    console.error(error);
    res.status(404).send("Device status not found");
  }
});

router.post("/checkout/:id", async (req, res) => {
  let date_ob = new Date();
  // current hours
  let hours = date_ob.getHours();
  //check if device is checked out
  const checkDevice = await Device.findById(req.params.id);
  if (checkDevice.isCheckedOut === false) {
    try {
      if (hours < 9 || hours > 17) {
        res.send("You can't work this hour");
      } else {
        const user = await User.findOne({
          fullname: req.body.lastCheckedOutBy,
        });
        const device = await Device.findByIdAndUpdate(req.params.id, {
          isCheckedOut: true,
          lastCheckedOutDate: new Date(),
          lastCheckedOutBy: req.body.lastCheckedOutBy,
        });
        if (user) {
          await User.findOneAndUpdate(user, {
            device: req.params.id,
          });
        }
        res.send(device);
      }
    } catch (error) {
      console.error(error);
      res.status(404).send("Device status not found");
    }
  } else {
    res.status(301).send("Device already checked out");
  }
});

//Post device into garage
router.post("/", async (req, res) => {
  //check if devices are up to 10
  const devices = await Device.find({});
  console.log(devices.length);
  if (devices.length < 11) {
    try {
      const device = new Device({
        ...req.body,
      });
      await device.save();
      res.send({
        status: "Ok",
        msg: "Posted successfully",
        info: device,
      });
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  } else {
    res.status(301).send({
      msg: "Garage is full",
    });
  }
});

//remove device

router.delete("/:id", async (req, res) => {
  try {
    const deviceToRemove = await Device.findById(req.params.id);
    if (deviceToRemove) {
      await Device.findByIdAndRemove(req.params.id);
      res.send("Removed successfully");
    } else {
      res.status(404).send("Device not found");
    }
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

module.exports = router;
