const express = require("express");
const router = express.Router();
const examController = require("../controllers/exam");
const resultController = require("../controllers/results");
const wrapasync = require("../utels/wrapAsync");


//creating exam
router
    .route("/create")
    .get(examController.examForm)
    .post(wrapasync(examController.createExam));

//open exam 
router
    .route("/open/:examId")
    .get(examController.openExam)
    .post(wrapasync(resultController.submitExam));

//get all exams
router 
    .route("/allExams")
    .get(wrapasync(examController.getAllExams));

//edit exam
router
    .route("/editExam/:examId")
    .get(examController.editExamForm)
    .post(wrapasync(examController.editExam));

//delete exam
router
    .route("/deleteExam/:examId")
    .get(wrapasync(examController.deleteExam));
    
module.exports = router;