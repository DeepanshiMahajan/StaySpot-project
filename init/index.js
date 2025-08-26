const mongoose = require("mongoose");
const initData= require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  
  // create a new array with owner field added
  const dataWithOwner = initData.data.map((obj) => ({
    ...obj,
    owner: "68a76145ad07368101b5ee82",
  }));

  // insert the modified array
  await Listing.insertMany(dataWithOwner);
  console.log("Data was initialized");
};


initDB();