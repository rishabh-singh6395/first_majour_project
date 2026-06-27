const mongoose = require("mongoose");



const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:String,
    image:{ 
        filename:String,
        url:{
            type:String,
            default:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        }
    },
    price:Number,
    location:String,
    country:String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;