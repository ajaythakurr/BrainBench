const mongoose = require("mongoose");


const questionSchema = new mongoose.Schema({
    examId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
        required:true
    },
    question:{
        type:String,
        required:true
    },
    options: {
        type: [String],
        required: true,
        validate: {
          validator: function (v) {
            return Array.isArray(v) && v.length >= 2;
          },
          message: "A question must have at least 2 options."
        }
      },      
      correctOption: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return this.options.includes(v);
          },
          message: "Correct option must be one of the provided options."
        }
      }, 
    marks:{
        type:Number,
        required:true,
        default:1
    }
},{timestamps:true});

module.exports = mongoose.model("Question",questionSchema);