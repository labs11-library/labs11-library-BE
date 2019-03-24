const express = require("express");
const router = express.Router();

const rp = require("request-promise");
const { parseString } = require("xml2js");

router.get("/", (req, res) => {
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

module.exports = router;
