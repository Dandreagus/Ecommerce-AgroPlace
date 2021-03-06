const express = require("express");
const router = require("express").Router();
const {
  User,
  Order,
  OrderDetail,
  Product,
  PaymentMethod,
} = require("../../db");

const passport = require("passport");
const changeType = require("./changeType");
const getAll = require("./getAll");
const changeStatus = require("./changeStatus");
const getInfo = require("./getInfo");

// Middlewares
router.use(express.json());

// User routes
router.get("/", passport.authenticate("bearer", { session: false }), getAll);
router.get("/info/:id",  passport.authenticate("bearer", { session: false }), getInfo)
router.put("/promote/:id", passport.authenticate("bearer", { session: false }), changeType);
router.put("/delete/:id",passport.authenticate("bearer", { session: false }), changeStatus);


router.put('/update', (req,res)=>{
  res.send('ok')
})


module.exports = router;
