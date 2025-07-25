const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Mongo_Url = process.env.MONGO_URL;
const connectDb = async () =>{
    try{
        await mongoose.connect(Mongo_Url);
        console.log("Connected to MongoDB");
    }catch(error){
        console.log("Error connecting to MongoDB");
        console.error(error.message);
        process.exit(1);
    }

}

module.exports = connectDb;