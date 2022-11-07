const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const Volunteer = require('../models/volunteerModel')
const moment = require("moment");


router.post("/register", async (req, res) => {
    try {
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        return res
          .status(200)
          .send({ message: "User already exists", success: false });
      }
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;
      const newuser = new User(req.body);
      await newuser.save();
      res
        .status(200)
        .send({ message: "User created successfully", success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Error creating user", success: false, error });
    }
  });
  
  router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(200)
          .send({ message: "User does not exist", success: false });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(200)
          .send({ message: "Password is incorrect", success: false });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res
          .status(200)
          .send({ message: "Login successful", success: true, data: token });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Error logging in", success: false, error });
    }
  });
  
  router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      user.password = undefined;
      if (!user) {
        return res
          .status(200)
          .send({ message: "User does not exist", success: false });
      } else {
        res.status(200).send({
          success: true,
          data: user,
        });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error getting user info", success: false, error });
    }
  });
  router.post("/apply-volunteer", authMiddleware, async (req, res) => {
    try {
      req.body.status = "pending";
      req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
      req.body.time = moment(req.body.time, "HH:mm").toISOString();
      const newAppointment = new Appointment(req.body);
      await newAppointment.save();
      //pushing notification to doctor based on his userid
      const user = await User.findOne({ _id: req.body.doctorInfo.userId });
      user.unseenNotifications.push({
        type: "new-Volunteer-request",
        message: `A new Volunteer request has been made by ${req.body.userInfo.name}`,
        onClickPath: "/user/volunteer",
      });
      await user.save();
      res.status(200).send({
        message: "apply Volunteer successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error apply Volunteer",
        success: false,
        error,
      });
    }
  });  

  module.exports = router;