// const keyPublishable = pk_test_Lk7CkE4Yez5LYD3KvwJwoYN500AVGVDnfZ;
// const keySecret = sk_test_8oKhvLvNcvAaWM4LQJpfUGSm00YJJmJlSg;
// const express = require("express");
// const router = express.Router();

// const app = require("express")();
// const stripe = require("stripe")(keySecret);

// router.set("view engine", "ejs");
// router.use(require("body-parser").urlencoded({ extended: false }));

// router.get("/", (req, res) => res.render("index", { keyPublishable }));

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

// module.exports = router;
