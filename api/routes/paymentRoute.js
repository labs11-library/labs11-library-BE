require("dotenv").config();
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.SECRET_KEY);

// router.set("view engine", "ejs");
router.use(require("body-parser").text());

router.get("/", (req, res) => res.render("index", process.env.PUBLISHABLE_KEY));

router.post("/charge", async (req, res) => {
	try {
		let { status } = await stripe.charges.create({
			amount: 2000,
			currency: "usd",
			description: "An example charge",
			source: req.body
		});

		res.json({ status });
	} catch (err) {
		res.status(500).end();
	}
});

// router.post("/charge", (req, res) => {
// 	let amount = 500;

// 	stripe.customers
// 		.create({
// 			email: req.body.stripeEmail,
// 			source: req.body.stripeToken
// 		})
// 		.then(customer =>
// 			stripe.charges.create({
// 				amount,
// 				description: "Sample Charge",
// 				currency: "usd",
// 				customer: customer.id
// 			})
// 		)
// 		.then(charge => res.render("charge"));
// });

module.exports = router;
