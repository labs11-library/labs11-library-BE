const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.SECRET_KEY);

router.set("view engine", "ejs");
router.use(require("body-parser").urlencoded({ extended: false }));

router.get("/", (req, res) => res.render("index", process.env.PUBLISHABLE_KEY));

router.post("/charge", (req, res) => {
	let amount = 500;

	stripe.customers
		.create({
			email: req.body.stripeEmail,
			source: req.body.stripeToken
		})
		.then(customer =>
			stripe.charges.create({
				amount,
				description: "Sample Charge",
				currency: "usd",
				customer: customer.id
			})
		)
		.then(charge => res.render("charge"));
});

module.exports = router;
