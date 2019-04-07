const express = require("express");
const router = express.Router();

const { authenticate } = require("../auth/authenticate");

const db = require("../../data/dbConfig");
const Books = require("../helpers/bookModel");

//GET user inventory

router.get("/:userId/inventory", authenticate, async (req, res) => {
  try {
    const inventory = await db("books").where({
      userId: req.params.userId
    });
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

router.get("/:userId/inventory/:bookId", authenticate, async (req, res) => {
  try {
    const inventory = await db("books")
      .where({ userId: req.params.userId })
      .first();
    const book = await Books.getBookById(req.params.bookId).first();
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

router.put("/:userId/inventory/:bookId", async (req, res) => {
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
    const item = await db("books").insert({
      ...req.body,
      userId: req.params.userId
    });
    const newBook = await db("books")
      .where({
        title: req.body.title,
        userId: req.params.userId
      })
      .first();
    if (item) {
      res.status(200).json({ message: "Book added to shelf!", newBook });
    } else {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE Inventory Item

router.delete("/:userId/inventory/:bookId", async (req, res) => {
  try {
    const deletedBook = await db("books")
      .where({ bookId: req.params.bookId })
      .first()
      .del();
    if (deletedBook) {
      res.status(200).json({ message: "Item removed from inventory." });
    } else {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
