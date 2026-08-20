const mongoose = require("mongoose");
const { listingSchema  , reviewSchema} = require("./schema");
const Listing = require("./models/listing");
const Review = require("./models/review");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "You must be logged in to create a listing");
        return res.redirect("/login");
    }
    next();
}

module.exports.validateListing = (req,res,next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const err = new Error(error.message);
        err.status = 400;
        throw err;
    }
    next();
};
module.exports.validateReview = (req,res,next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        throw new Error( 400 , error) ;
    }
    else{
        next();
    }
};


module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req,res,next)=>{
    let { id } = req.params;
    id = id && id.trim ? id.trim() : id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        req.flash("error", "Invalid listing id");
        return res.redirect("/listings");
    }
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error" , "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports.isReviewAuthor = async (req,res,next)=>{
    const { id , reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
        req.flash("error", "Review not found");
        return res.redirect("/listings");
    }
    if (!review.author.equals(req.user._id)) {
        req.flash("error" , "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
