const express = require("express");
const router = express.Router();
const Inventory = require("../helpers/inventoryModel");

const rp = require("request-promise");
const { parseString } = require("xml2js");

const db = require("../../data/dbConfig");

//GET all users

router.get("/", async (req, res) => {
  try {
    const users = await db("users").orderBy("userId");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Could not retrieve users at this time." });
  }
});

//GET user by id

router.get("/:id", async (req, res) => {
  try {
    const user = await db("users")
      .where({ userId: req.params.id })
      .first();
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not retrieve the user at this time." });
  }
});

//GET user inventory

router.get("/:id/inventory", async (req, res) => {
  try {
    const inventory = await Inventory.getInventory(req.params.id);
    console.log(inventory);
    if (inventory) {
      res.status(200).json(inventory);
    } else {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//POST to inventory

router.post("/:id/inventory", async (req, res) => {
  try {
    // const inventory = await Inventory.getInventory(req.params.id);
    const item = await db("inventory").insert(req.body);
    if (item) {
      res.status(200).json({ message: "Book added to shelf!" });
    } else {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
