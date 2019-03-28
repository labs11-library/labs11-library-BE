const sgMail = require("@sendgrid/mail");
const express = require("express");
const router = express.Router();

const sgKey = process.env.SG_KEY;
sgMail.setApiKey(
	`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`
);

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

	sgMail.send(msg).then(msg => console.log(text));
});

module.exports = router;
