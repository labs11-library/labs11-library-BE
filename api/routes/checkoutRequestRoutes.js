const express = require("express");
const router = express.Router();

const { authenticate } = require("../auth/authenticate");

const db = require("../../data/dbConfig");
const CheckoutRequest = require("../helpers/checkoutRequestModel");

//GET User's checkedout list

router.get("/:userId/checkoutRequest", async (req, res) => {
  try {
    const checkoutRequests = await CheckoutRequest.getCheckoutRequests(
      req.params.userId
    );
    if (checkoutRequests) {
      res.status(200).json(checkoutRequests);
    } else {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET specific user checkedOut event by ID

router.get("/:userId/checkoutRequest/:checkoutRequestId", async (req, res) => {
  try {
    const checkoutRequest = await CheckoutRequest.getCheckoutRequestById(
      req.params.checkoutRequestId
    );
    if (checkoutRequest) {
      res.status(200).json(checkoutRequest);
    } else {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/:userId/checkoutRequest", async (req, res) => {
  try {
    const item = await db("checkoutRequest").insert({
      ...req.body,
      borrowerId: req.params.userId
    });
    if (item) {
      res.status(200).json({ message: "Checkout request has been sent!" });
    } else {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
