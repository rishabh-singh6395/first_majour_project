const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err)=>{
    console.log("error", err);
})

async function main() {
    await mongoose.connect(MONGO_URL) ;
}

const initDB = async () => {
    await Listing.deleteMany({});
    const ownerId = new mongoose.Types.ObjectId("6a77ec3893d6785a285d0c50");
    data.data = data.data.map((obj) =>({
        ...obj,
        owner: ownerId ,
    }));
    await Listing.insertMany(data.data); 
    console.log("DB initialized with sample data");
};

if (require.main === module) {
    initDB();
}

module.exports = { initDB, main };
