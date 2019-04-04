require("dotenv").config();
const router = require("express").Router();
const stripe = require("stripe")(process.env.SECRET_KEY);
const models = require("../helpers/usersModel");

router.post("/charges", async (req, res) => {
  try {
    const token = req.body.stripeToken;
    const charge = await stripe.charges.create({
      amount: 100,
      currency: "usd",
      source: token
      // stripeToken,
      // stripeTokenType,
    });
    console.log(charge);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post("/create_customer", async (req, res) => {
  try {
    console.log(req.body.id);
    console.log(req.body.email);
    // const token = req.body.stripeToken;
    const customer = await stripe.customers.create({
      // account_balance: req.body.amount || 0,
      email: req.body.email,
      // name: req.body.name,
      // description:
      //   req.body.description || `Stripe Account for ${req.body.email}`,
      source: req.body.id
    });
    // console.log(customer);

    // if (customer.id) {
    //   const success = await models.updateStripe(
    //     "users",
    //     { email: customer.email },
    //     { stripe_cust_id: customer.id }
    //   );
    //   res
    //     .status(201)
    //     .json({ message: "Customer created successfully", customer });
    // } else {
    //   res.status(500).json({
    //     message:
    //       "There was an issue when we created the customer account, please try again."
    //   });
    // }
  } catch ({ message }) {
    res.status(404).json({ message });
  }
});

module.exports = router;
