const mongoose = require("mongoose");
const Exam  = require("../models/exam");
const Question = require("../models/question");
const User = require("../models/users");
const Result = require("../models/results");
const wrapAsync = require("../utils/wrapAsync");

//open exam form
module.exports.examForm = (req,res)=>{
    res.send("exam form");
}
//exam
module.exports.createExam = async(req,res)=>{
    const {title,description,subject,questions,duration,isActive} = req.body;

    //validate if user is organizer
    if(req.user.role !== "organizer"){
        return res.status(403).json({message:"only organizer can create exam"});
    }

    //create a new Exam
    const newExam= new Exam({
        title,
        description,
        subject,
        createdBy:req.user._id,
        duration,
        isActive
    });

    //add the exam to the exams array
    const savedExam = await newExam.save();

    //adding exam id to questions 
    const questionsWithExamId = questions.map(q=>{
        return{
            ...q,
            examId:savedExam._id
        }
    });

    const savedQuestions  = await Question.insertMany(questionsWithExamId);

    //add questions to exam
    savedExam.questions = savedQuestions.map(q=>q._id);
    await savedExam.save();

    //add exam to user's created exams
    const user = await User.findById(req.user._id); 
    user.examsCreated.push(savedExam._id);
    await user.save();

    

    return res.status(201).json({
        message:"Exam created successfully",
        exam:savedExam
    })
}


//open exam during attempting
module.exports.openExam = async(req,res)=>{
    const examId = req.params.examId;

    //populate exam with its questions
    const exam = await Exam.findById(examId).populate("questions");
    if(!exam){
        res.status(404).json({message:"Exam Not Found"});
    }
    res.status(200).json({
        message:"Exam opened successfully",
        exam:exam
    })
}



