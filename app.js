const express = require("express");
const app = express() ;
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const { listingSchema } = require("./Schema.js");



const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL) ;
}

main().then(() => {
        console.log("connected");
    })
    .catch((err)=>{
        console.log("error", err);
    });

     

     
app.set("view engine" , "ejs");
app.set("views" ,path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));   
 


app.get("/", (req, res)=>{
    res.send("Hyee i am root");
});



const validateListing = (req,res,next) => {
    const {error} = listingSchema.validate(req.body);
    if(error){
        throw new Error( 400 , error) ;
    }
    else{
        next();
    }
}


// app.get("/testListing",async(req,res)=>{
//     let newListing = new Listing({
//         titel:"Beautiful Beach House",
//         description:"A lovely beach house with stunning ocean views.",
//         image:"",
//         price:250,
//         location:"Malibu, California",
//         country:"USA",
//     });

//     await newListing.save();
//     console.log("sample was saved");
//     res.send("successfull testing");
// });


//index rout
app.get("/listings",async (req,res)=>{
    const allListings = await Listing.find({});
    // render view by name (no leading slash or extension)
    res.render("listings/index", { allListings });

});



// new rout
app.get("/listings/new" , (req,res)=>{
    res.render("listings/new")
}); 


// show rout 
app.get("/listings/:id",wrapAsync(async(req,res,next)=>{
    let {id} = req.params;
    // Trim whitespace that may be accidentally included in links/forms
    id = id && id.trim ? id.trim() : id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('Invalid listing id');
        err.status = 400;
        return next(err);
    }
    const listing = await Listing.findById(id);
    if (!listing) {
        const err = new Error('Listing not found');
        err.status = 404;
        return next(err);
    }
    // folder is 'listings', so render the 'listings/show' view
    res.render("listings/show", { listing });
}));





//create rout
app.post("/listings", validateListing , wrapAsync(async (req, res ,next) => {

       
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
    
}));

//edit rout
app.get("/listings/:id/edit" , wrapAsync(async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id) ;
    // render the edit view inside views/listings
    res.render("listings/edit", { listing });
}));


//update rout 
app.put("/listings/:id" , wrapAsync(async(req,res)=>{
    let {id} = req.params ;
    // update the listing with data from the form (assumes form fields named listing[...])
    await Listing.findByIdAndUpdate(id, req.body.listing, { runValidators: true });
    res.redirect(`/listings`);
}))

//delete rout 
app.delete("/listings/:id" , wrapAsync(async(req,res) => {
    let {id} = req.params ;   
    let deletedListing = await Listing.findByIdAndDelete(id) ;
    console.log(deletedListing);
    res.redirect("/listings");
}));

// 404 handler - for undefined routes
app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
});

// Error handler middleware
app.use((err,req,res,next ) => {
    let {status = 500 , message = "something went wrong"} = err ;
    res.status(status).render("error.ejs", { message });
});

// start server after routes are defined
app.listen(8080, ()=>{
    console.log("server is running on port 8080");
});

