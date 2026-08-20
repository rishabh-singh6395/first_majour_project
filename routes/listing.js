const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Listing = require('../models/listing');
const wrapAsync = require('../utils/wrapAsync');
const { listingSchema , reviewSchema} = require('../schema');
const { isLoggedIn , isOwner , validateListing } = require('../middileware');
const multer = require('multer');
const { storage } = require('../cloudConfig');
const upload = multer({ storage: storage });



const listingController = require("../controllers/listing.js");

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing)
  );
  



// new rout
router.get("/new" , isLoggedIn , listingController.renderNewForm); 



router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) //show route
  .put(                                         //update route
    isLoggedIn, 
    isOwner, 
    upload.single('listing[image]'),
    validateListing, 
    wrapAsync(listingController.updateListing)
  )
  .delete(                                      //delete route
    isLoggedIn , 
    isOwner , 
    wrapAsync(listingController.deleteListing)
); 


//edit rout
router.get("/:id/edit" , isLoggedIn , isOwner, wrapAsync(listingController.renderEditForm));




module.exports = router;
