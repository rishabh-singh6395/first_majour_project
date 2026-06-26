const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        console.log("Old listings removed");
        // data.js exports { data: sampleListings }
        const payload = initData && Array.isArray(initData.data) ? initData.data : (Array.isArray(initData) ? initData : []);
        if (!payload || payload.length === 0) {
            console.warn("No listings found in init data — nothing to insert.");
            return;
        }
        await Listing.insertMany(payload);
        console.log("DB Initialized with sample data");
    } catch (err) {
        console.error("initDB error:", err && err.stack ? err.stack : err);
        throw err;
    }
};

async function main() {
    try {
        console.log("Connecting to", MONGO_URL);
        await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("connected to MongoDB");
        await initDB();
    } catch (err) {
        console.error("connection/init error:", err && err.stack ? err.stack : err);
        process.exit(1);
    } finally {
        // If this script is run directly, disconnect afterwards.
        if (require.main === module) {
            try { await mongoose.disconnect(); } catch (e) { /* ignore */ }
        }
    }
}

if (require.main === module) {
    main().catch((err) => {
        console.error("startup error:", err && err.stack ? err.stack : err);
        process.exit(1);
    });
}

module.exports = { initDB, main };
