const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true

    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    questions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Question"
        }

    ],
    duration:{
        type:Number,
        required:true
    },
    isActive:{
        type:Boolean,
        default:false
    },
},{timestamps:true});

module.exports = mongoose.model("Exam",examSchema);
