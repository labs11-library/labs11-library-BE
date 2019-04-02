require("dotenv").config();
const router = require("express").Router();
const stripe = require("stripe")(process.env.SECRET_KEY);

router.post("/charges", async (req, res) => {
  try {
    const charge = await stripe.charges.create({
      amount: 2000,
      currency: "usd"
      // stripeToken,
      // stripeTokenType,
    });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

route.post("/create_customer", async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      account_balance: req.body.amount || 0,
      email: req.body.email,
      description:
        req.body.description || `Stripe Account for ${req.body.email}`,
      source: req.body.stripeToken
    });

    if (customer.id) {
      const success = await models.updateStripe(
        "users",
        { email: customer.email, id: req.decoded.id },
        { stripe_cust_id: customer.id }
      );
      res
        .status(201)
        .json({ message: "Customer created successfully", customer });
    } else {
      res
        .status(500)
        .json({
          message:
            "There was an issue when we created the customer account, please try again."
        });
    }
  } catch ({ message }) {
    res.status(404).json({ message });
  }
});
