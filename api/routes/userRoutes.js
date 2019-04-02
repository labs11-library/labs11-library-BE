const express = require("express");
const router = express.Router();
// const CheckedOut = require("../helpers/checkedOutModel");
const Books = require("../helpers/bookModel");
const Reviews = require("../helpers/reviewsModel");
// const Books = require("../helpers/bookModel");

const { authenticate } = require("../auth/authenticate");

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

//DELETE USER

router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await db("users")
      .where({ userId: req.params.id })
      .first()
      .select("firstName");
    const deleted = await db("users")
      .where({ userId: req.params.id })
      .del();
    if (deleted) {
      return res
        .status(200)
        .json({ message: `Sorry to see you go, ${deletedUser.firstName}` });
    } else {
      res
        .status(404)
        .json({ error: "The user with the specified ID does not exits." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The user could not be deleted at this time." });
  }
});

//--------CHECKEDOUT

// router.get("/:userId/checkedOut", async (req, res) => {
//   try {
//     const checkedOut = await CheckedOut.getCheckedOut(req.params.userId);
//     if (checkedOut) {
//       res.status(200).json(checkedOut);
//     } else {
//       res.status(404).json(error);
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// //GET specific user checkedOut event by ID

// router.get("/:userId/checkedOut/:checkedOutId", async (req, res) => {
//   try {
//     const checkedOutEvent = await CheckedOut.getCheckedOutById(
//       req.params.checkedOutId
//     );
//     if (checkedOutEvent) {
//       res.status(200).json(checkedOutEvent);
//     } else {
//       res.status(404).json(error);
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// router.post("/:userId/checkedOut", async (req, res) => {
//   try {
//     const checkedOutBook = await db("books").update({ available: false });
//     const item = await db("checkedOut").insert({
//       ...req.body,
//       lenderId: req.params.userId
//     });
//     if (item && checkedOutBook) {
//       res.status(200).json({ message: "Book checked out!" });
//     } else {
//       res.status(404).json(error);
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

//----------REVIEWS

//GET User's Reviews

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
    console.log(review);
    if (review) {
      res.status(200).json({ message: "Review added." });
    } else {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
