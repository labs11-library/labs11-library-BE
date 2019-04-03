const express = require("express");
const router = express.Router();

const { authenticate } = require("../auth/authenticate");

const db = require("../../data/dbConfig");
const Checkout = require("../helpers/checkoutModel");

// GET User's checkout items

router.get("/:userId/checkout", async (req, res) => {
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

router.post("/:userId/checkout", async (req, res) => {
  try {
    const item = await db("checkout").insert(req.body);
    const updatedRequest = await db("checkoutRequest")
      .where({ checkoutRequestId: req.body.checkoutRequestId })
      .first()
      .update({ checkoutAccepted: true });
    // const updatedBook = await db("books")
    //   .where({ bookId: req.body.bookId })
    //   .first()
    //   .update({ available: false });
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
