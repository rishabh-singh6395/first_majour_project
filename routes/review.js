const express = require('express');
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema , reviewSchema} = require("../schema");

const mongoose = require("mongoose");
const Listing = require("../models/listing");
const Review = require("../models/review");
const { validateReview, isLoggedIn , isReviewAuthor } = require("../middileware");


const reviewController = require("../controllers/review.js");





//post review rout
router.post("/" , validateReview , isLoggedIn , wrapAsync(reviewController.createReview));

//delete review rout
router.delete("/:reviewId",isLoggedIn , isReviewAuthor , wrapAsync(reviewController.deleteReview));



module.exports = router;
