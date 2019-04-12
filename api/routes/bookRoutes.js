const express = require("express");
const db = require("../../data/dbConfig");
const router = express.Router();
const Books = require("../helpers/bookModel");

const rp = require("request-promise");
const { parseString } = require("xml2js");

router.post("/search", (req, res) => {
  rp.get(
    `https://www.goodreads.com/search/index.xml?key=${
      process.env.GOODREADS_KEY
    }&q=${req.body.title || req.body.authors || req.body.ISBN}`
  ).then(result =>
    parseString(result, (err, goodreadsResult) =>
      res.json({
        books: goodreadsResult.GoodreadsResponse.search[0].results[0].work.map(
          work => ({
            goodreadsId: work.best_book[0].id[0]._,
            title: work.best_book[0].title[0],
            authors: work.best_book[0].author[0].name[0],
            covers: [work.best_book[0].image_url[0]],
            average_rating: [work.average_rating[0]]
          })
        )
      })
    )
  );
});

// GET all books

router.get("/", async (req, res) => {
  try {
    const books = await Books.getAllBooks().orderBy("bookId");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST book

router.post("/", async (req, res) => {
  try {
    const book = await db("books").insert(req.body);
    // const newBook = await db("books")
    //   .where({ title: req.body.title })
    //   .first();
    if (book) {
      return res.status(200).json({ message: "Book successfully added" });
    } else {
      return res.status(404).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

//GET Book by ID

router.get("/:bookId", async (req, res) => {
  try {
    const book = await Books.getBookById(req.params.bookId).first();
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Could not find a book with that ID." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not retrieve the book at this time." });
  }
});

// PUT (edit) Book

router.put("/:bookId", async (req, res) => {
  try {
    const book = await db("books")
      .where({ bookId: req.params.bookId })
      .update(req.body);
    const editedBook = await db("books")
      .where({ bookId: req.params.id })
      .first();
    if (book) {
      return res.status(200).json({ message: "Book edited!", editedBook });
    } else {
      return res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
