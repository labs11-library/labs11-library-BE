const sgMail = require("@sendgrid/mail");
const express = require("express");
// const db = require("../../data/dbConfig");
const router = express.Router();

sgMail.setApiKey(process.env.SG_KEY);

router.get("/", (req, res) => {
	res.send("test of the sendgrid server");
});

router.get("/send-email", (req, res) => {
	const { recipient, sender, topic, text } = req.query;

	const msg = {
		to: recipient,
		from: sender,
		subject: topic,
		text: text
	};
});
