require("dotenv").config();
const router = require("express").Router();
const stripe = require("stripe")(process.env.SECRET_KEY);
const db = require("../../data/dbConfig");

router.post("/charges", async (req, res) => {
  try {
    const token = req.body.stripeToken;
    const charge = await stripe.charges.create({
      amount: 100,
      currency: "usd",
      source: token
    });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post("/create_customer", async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      email: req.body.email,

      source: req.body.id
    });

    const editedUser = await db("users")
      .where({ email: customer.email })
      .first()
      .update({
        stripe_email: customer.email,
        stripe_cust_id: customer.id,
        stripe_card_id: customer.default_source
      });

    if (editedUser) {
      res
        .status(201)
        .json({ message: "Customer created successfully", editedUser });
      res.status(201).json(editedUser);
    } else {
      res.status(500).json({
        message:
          "There was an issue when we created the customer account, please try again."
      });
    }
  } catch ({ message }) {
    res.status(501).json({ message });
  }
});

router.post("/charge", async (req, res) => {
  try {
    const charge = await stripe.charges.create({
      amount: req.body.amount,
      currency: "usd",
      customer: req.body.customer
    });
    if (charge) {
      res
        .status(200)
        .json({ message: "Late fee charged successfully", charge });
    } else {
      res.status(404).json(error);
    }
  } catch {
    res.status(500).json(error);
  }
});

module.exports = router;
