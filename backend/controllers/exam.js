const mongoose = require("mongoose");
const Exam  = require("../models/exam");
const Question = require("../models/question");
const User = require("../models/users");
const Result = require("../models/results");

//open exam form--------------------------------------------------------------------------------
module.exports.examForm = (req,res)=>{
    res.send("exam form");
}
//create exam--------------------------------------------------------------------------------
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


//open exam during attempting--------------------------------------------------------------------------------
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

//edit exam form--------------------------------------------------------------------------------
module.exports.editExamForm = async (req,res)=>{
    const examId = req.params.examId;
    const exam = await Exam.findById(examId);

    if(!exam){
        return res.status(404).json({message:"Exam not found"});
    }

    res.status(200).json({exam}).populate("questions");
}
//edit exam--------------------------------------------------------------------------------
module.exports.editExam = async(req,res)=>{
    const examId = req.params.examId;
    const {title,description,subject,questions,duration,isActive} = req.body;

    //validate if user is organizer
    if(req.user.role !== "organizer"){
        return res.status(403).json({message:"only organizer can edit exam"});
    }

    //find the exam 
    const exam = await Exam.findById(examId).populate("questions");
    if(!exam){
        return res.status(404).json({message:"Exam not found"});
    }

    //update the questions
    for(let q of questions){
        await Question.findByIdAndUpdate(q._id,{
            question:q.question,
            options:q.options,
            correctOption:q.correctOption,
            examId:examId
        })
    }

    //update the exam
    exam.title = title; 
    exam.description = description;
    exam.subject = subject;
    exam.duration = duration;
    exam.isActive = isActive;
    await exam.save();

    res.status(200).json({message:"Exam updated successfully"});
}

//delete exam--------------------------------------------------------------------------------   
module.exports.deleteExam = async(req,res)=>{
    const examId = req.params.examId;
    const exam = await Exam.findById(examId);

    if(!exam){
        return res.status(404).json({message:"Exam not found"});
    }

    //delete exam from user's created exams
    const userId = exam.createdBy;
    const user = await User.findById(userId);
    if(user){
        user.examsCreated = user.examsCreated.filter(id=>id.toString() !== examId);
        await user.save();
    }

    // delete questions of exam
    await Question.deleteMany({examId:examId});
    
    //delete the exam
    await Exam.findByIdAndDelete(examId);

    res.status(200).json({message:"Exam deleted successfully"});
}


//get all exams--------------------------------------------------------------------------------
module.exports.getAllExams = async(req,res)=>{
    const exams = await Exam.find({}).populate("questions");
    if(req.user.role === "organizer"){
        // For organizer, show only their created exams
        exams = exams.filter(exam => exam.createdBy.toString() === req.user._id.toString());
    } else {
        // For participant, show only active exams
        exams = exams.filter(exam => exam.isActive);
    }
    res.status(200).json({
        success: true,
        exams
    });
}