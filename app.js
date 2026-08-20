if(process.env.NODE_ENV !== "production"){
require("dotenv").config();
}

const express = require("express");
const app = express() ;
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const { listingSchema , reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const users = require("./routes/user.js");



// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const dbUrl = process.env.ATLASDB_URL;

async function startServer() {
  try {
    await mongoose.connect(dbUrl, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection failed:", err.message);
  }

  app.listen(8080, () => {
    console.log("server is running on port 8080");
  });
}

startServer();

app.set("view engine" , "ejs");
app.set("views" ,path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));   
 


const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 60 * 60, // time period in seconds
})



const sessionOptions = {
  store: store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
  expire: Date.now() + 7*24*60*60*1000, // 7 days in milliseconds
  maxAge: 7*24*60*60*1000, 
  }
}


// app.get("/", (req, res)=>{
//     res.send("Hyee i am root");
// });



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
})


app.get("/demouser", async(req,res)=>{
  let fakeuser = new User({
    email:"st@gmail.com",
    username:"st"
  });

  let registeredUser = await User.register(fakeuser , "1234" );
  res.send(registeredUser);
});



app.use("/listings" , listings);
app.use("/listings/:id/reviews" ,reviews);
app.use("/" , users);


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


