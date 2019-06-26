require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const express = require("express");
const router = express.Router();

// const sgKey = process.env.SG_KEY;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get("/", (req, res) => {
	res.send("test of the sendgrid server");
});

router.get("/send-email", (req, res) => {
	const { recipient, sender, topic, html } = req.query;

	const message = {
		to: recipient,
		from: sender,
		subject: topic,
		html: html
	};
	sgMail
	.send(message)
	.then(console.log("BE success"))
	.catch(err => console.error(err))
	
});

module.exports = router;
