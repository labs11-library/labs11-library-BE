const express = require("express");
const router = express.Router();
const moment = require("moment");

const { authenticate } = require("../auth/authenticate");

const db = require("../../data/dbConfig");
const Checkout = require("../helpers/checkoutModel");

// GET User's checkout items

router.get("/:userId/checkout", async (req, res) => {
  //AUTHBACK
  try {
    const checkout = await Checkout.getCheckout(req.params.userId);
    if (checkout) {
      res.status(200).json(checkout);
    } else {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET specific user checkedOut event by ID

router.get("/:userId/checkout/:checkoutId", async (req, res) => {
  //AUTHBACK
  try {
    const checkoutEvent = await Checkout.getCheckoutById(req.params.checkoutId);
    if (checkoutEvent) {
      res.status(200).json(checkoutEvent);
    } else {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//PUT specific user checkedOut event by ID - used for return

router.put("/:userId/checkout/:checkoutId", async (req, res) => {
  try {
    const checkoutEvent = await Checkout.getCheckoutById(
      req.params.checkoutId
    ).update(req.body);
    if (checkoutEvent) {
      res.status(200).json({ message: "Checkout returned!" });
    } else {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/:userId/checkout", async (req, res) => {
  try {
    let checkoutDate = Date.now();
    let threeWeeks = moment(new Date(checkoutDate)).add(21, "days");
    let dueDate = moment(threeWeeks).format("YYYY-MM-DD HH:mm:ss");
    const item = await db("checkout").insert({ ...req.body, dueDate });
    const updatedRequest = await db("checkoutRequest")
      .where({ checkoutRequestId: req.body.checkoutRequestId })
      .first()
      .update({ checkoutAccepted: true });
    if (item && updatedRequest) {
      res.status(200).json({ message: "Book checked out!" });
    } else {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
