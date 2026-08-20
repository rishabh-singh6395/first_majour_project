const mongoose = require("mongoose");
const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const escapeRegex = (value = "") => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");



module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
    // render view by name (no leading slash or extension)
    res.render("listings/index", { allListings });

}

module.exports.renderNewForm = (req,res)=>{
    
    res.render("listings/new")
}

module.exports.showListing = async(req,res,next)=>{
    let {id} = req.params;
    // Trim whitespace that may be accidentally included in links/forms
    id = id && id.trim ? id.trim() : id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('Invalid listing id');
        err.status = 400;
        return next(err);
    }
    const listing = await Listing.findById(id).populate( {path : "reviews" , populate: { path: "author" }}).populate("owner");
    
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    
    // folder is 'listings', so render the 'listings/show' view
    res.render("listings/show", { listing });
}


module.exports.createListing = async (req, res ,next) => {
    let title = req.body.listing.title.trim();
    let location = req.body.listing.location.trim();

    let duplicateListing = await Listing.findOne({ title, location });
    if (duplicateListing) {
        req.flash("error", "This listing already exists");
        return res.redirect("/listings");
    }

    let response = await geocodingClient
        .forwardGeocode({
            query: location,
            limit: 1,
        })
        .send();

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = response.body.features[0].geometry;
    await newListing.save();
    req.flash("success" , "new listing was created successfully");
    return res.redirect("/listings");
}


module.exports.renderEditForm = async(req,res,next) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id) ;
    // render the edit view inside views/listings
    
    res.render("listings/edit", { listing  });
}

module.exports.updateListing = async(req,res,next)=>{
    let {id} = req.params ;
    let listing = await Listing.findById(id) ;

    if(typeof req.file !== "undefined" ){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
    }

    // update the listing with data from the form (assumes form fields named listing[...])
    await Listing.findByIdAndUpdate(id, req.body.listing, { runValidators: true });
    req.flash("success" , "Listing was updated successfully");
    return res.redirect(`/listings`);
}

module.exports.deleteListing = async(req,res,next) => {
    let {id} = req.params ;
    id = id && id.trim ? id.trim() : id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('Invalid listing id');
        err.status = 400;
        return next(err);
    }
    let deletedListing = await Listing.findByIdAndDelete(id) ;
    req.flash("success" , "Listing was deleted successfully");
        
    return res.redirect("/listings");
}