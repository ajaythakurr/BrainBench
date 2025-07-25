const express = require("express");
const router = express.Router();
const examController = require("../controllers/exam");
const resultController = require("../controllers/results");


//creating exam
router
    .route("/create")
    .get(examController.examForm)
    .post(examController.createExam);

//open exam
router
    .route("/open/:examId")
    .get(examController.openExam)
    .post(resultController.submitExam);

    
