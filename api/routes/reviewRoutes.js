const express = require("express");
const router = express.Router();

const Reviews = require("../helpers/reviewsModel");

router.get("/:userId/reviews", async (req, res) => {
  try {
    const reviewList = await Reviews.getReviewList(req.params.userId);
    if (reviewList) {
      res.status(200).json(reviewList);
    } else {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET specific review by review Id

router.get("/:userId/reviews/:reviewId", async (req, res) => {
  try {
    const reviewEvent = await Reviews.getReviewList(
      req.params.reviewId
    ).first();
    if (reviewEvent) {
      res.status(200).json(reviewEvent);
    } else {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//POST a review

router.post("/reviews", async (req, res) => {
  try {
    const review = await db("reviews").insert(req.body);
    if (review) {
      res.status(200).json({ message: "Review added." });
    } else {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE a review

router.delete("/:userId/reviews/:reviewId", async (req, res) => {
  try {
    const deletedREview = await Reviews.getReviewList(
      req.params.reviewId
    ).del();
    if (deletedREview) {
      res.status(200).json({ message: "Review deleted" });
    } else {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
