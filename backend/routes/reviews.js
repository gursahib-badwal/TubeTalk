var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const reviewModel = require('../models/reviews.model');

const ReviewModel = require('../models/reviews.model');


router.get('/list/:contentId', async (req, res) => {

  const contentId = req.params.contentId;

  reviewModel.find({ contentId: contentId })
    .then(reviews => {
      res.status(200).send(reviews);
    })
    .catch(err => {
      console.log(err);
      console.log("Error in GET /api/reviews/list/:contentId");
      res.status(500).json({ message: "Error retrieving reviews" });
    });

});

router.post('/add', async (req, res) => {

  const { reviewId, rating, comment, contentId, userId, userName } = req.body;

  try {
    const newReview = {
      reviewId,
      rating,
      comment,
      contentId,
      userId,
      userName
    }

    const response = await ReviewModel.create(newReview);

    console.log("Revew Created Successfully", response);
    res.status(200).json({ message: "Review Created Successfully" });

  } catch (err) {
    console.log(err);
    console.log("Error in POST /api/reviews/add");
    res.status(400).json({ message: "Error creating review" });

  }

});

router.delete('/delete/:reviewId', async (req, res) => {

  const reviewId = req.params.reviewId;
  reviewModel.deleteOne({ reviewId: reviewId })
    .then(result => {
      if (result.deletedCount === 0) {
        console.log("Review not found");
        res.status(404).json({ message: "Review not found" });

      } else {
        console.log("Review deleted successfully");
        res.status(200).json({ message: "Review deleted successfully" });
      }
    })
    .catch(err => {
      console.log(err);
      console.log("Error in DELETE /api/reviews/delete/:reviewId");
      res.status(500).json({ message: "Error deleting review" });
    });

});

module.exports = router;
