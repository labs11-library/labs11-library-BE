require("dotenv").config();
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.SECRET_KEY);

// router.set("view engine", "ejs");
router.use(require("body-parser").text());

router.get("/", (req, res) => res.render("index", process.env.PUBLISHABLE_KEY));
// router.post("/charge", async (req, res) => {
// 	// const _customer = await models.findBy("users", { id: req.decoded.id });

// 	try {
// 		const charge = await stripe.charges.create({
// 			amount: Math.floor(Math.abs(amount) * 100) || 0,
// 			currency: "usd"
// 		});

// 		await models.update("users", req.decoded.id, {
// 			amount: 0
// 		});
// 		res.status(200).json(charge);
// 	} catch ({ message }) {
// 		res.status(500).json({ message });
// 	}
// });

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

module.exports = router;
