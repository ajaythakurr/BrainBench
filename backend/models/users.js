const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,    
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,

    },
    role:{
        type: String,
        enum: ["organizer","participant"],
        required: true,
    },
    examsCreated: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam"
      }],
    examsResults: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam"
      }],
      
},{timestamps:true});

module.exports = mongoose.model("User",userSchema);