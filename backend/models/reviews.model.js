const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    reviewId: String,
    rating: String,
    comment: String,
    contentId: String,
    userId: String,
    userName: String
  },
  {collection: 'reviews'}

)

const reviewModel = mongoose.model('Review', reviewSchema);

module.exports = reviewModel;