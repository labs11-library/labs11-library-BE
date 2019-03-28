const express = require("express");
const router = express.Router();
const CheckedOut = require("../helpers/checkedOutModel");
const passport = require("passport");
const { authenticate } = require("../auth/authenticate");

const rp = require("request-promise");
const { parseString } = require("xml2js");

const db = require("../../data/dbConfig");

//GET all users

router.get("/", authenticate, async (req, res) => {
  try {
    const users = await db("users").orderBy("userId");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Could not retrieve users at this time." });
  }
});

//CREATE user (POST)

router.post("/", async (req, res) => {
  try {
    const user = await db("users").insert(req.body);
    if (user) {
      return res.status(200).json({ message: "User created successfully." });
    } else {
      return res
        .status(404)
        .json({ error: "The user could not be created at this time." });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

//GET user by id

router.get("/:userId", async (req, res) => {
  try {
    const user = await db("users")
      .where({ userId: req.params.userId })
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

//EDIT USER

router.put("/:userId", async (req, res) => {
  try {
    const edited = await db("users")
      .where({ userId: req.params.userId })
      .update(req.body);
    const editedUser = await db("users")
      .where({ userId: req.params.userId })
      .first();
    if (edited) {
      return res
        .status(200)
        .json({ message: "User successfully edited!", editedUser });
    } else {
      return res
        .status(404)
        .json({ error: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET user inventory

router.get("/:userId/inventory", async (req, res) => {
  try {
    const inventory = await db("books").where({ userId: req.params.userId });
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

//GET user specific inventory by id

router.get("/:userId/inventory/:bookId", async (req, res) => {
  try {
    const inventory = await db("books").where({ userId: req.params.userId });
    const book = await db("books").where({ bookId: req.params.bookId });
    console.log(book);
    if (inventory && book) {
      res.status(200).json(book);
    } else {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//PUT (EDIT) user specific inventory by id

router.put("/:userIdid/inventory/:bookId", async (req, res) => {
  try {
    const book = await db("books")
      .where({ bookId: req.params.bookId })
      .first()
      .update(req.body);
    const editedBook = await db("books")
      .where({ bookId: req.params.bookId })
      .first();
    if (editedBook) {
      res.status(200).json({ message: "Book edited!", editedBook });
    } else {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//POST to inventory

router.post("/:userId/inventory", async (req, res) => {
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

//--------CHECKEDOUT

//GET user checkedOut

router.get("/:userId/checkedOut", async (req, res) => {
  try {
    const checkedOut = await CheckedOut.getCheckedOut(req.params.userId);
    if (checkedOut) {
      res.status(200).json(checkedOut);
    } else {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET specific user checkedOut event by ID

router.get("/:userId/checkedOut/:checkedOutId", async (req, res) => {
  try {
    const checkedOutEvent = await db("checkedOut").where({
      checkedOutId: req.params.checkedOutId
    });
    if (checkedOutEvent) {
      res.status(200).json(checkedOutEvent);
    } else {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//POST to checkedOut

router.post("/:userId/checkedOut", async (req, res) => {
  try {
    // const checkedOut = await Inventory.getInventory(req.params.id);
    const item = await db("checkedOut").insert(req.body);
    if (item) {
      res.status(200).json({ message: "Book checked out!" });
    } else {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
