const Exam = require("../models/exam");
const Result = require("../models/results");

//submit exam and save result
module.exports.submitExam = async (req,res)=>{
    const  {examId,responses} = req.body;
    //validate if user is participant
    if(req.user.role !== "participant"){
        res.status(403).json({message:"only participant can submit exam"});
    }

    //find exam andpopulate it 
    const exam = await Exam.findById(examId).populate("questions");
    if(!exam){
        res.status(404).json({message:"Exam Not Found"});
    };

    let score = 0;
    let totalMarks= 0;
    let correctAnswers = 0;

    let responsesArray = [];

    for(let question of exam.questions){
        if(question.correctOption === responses[question._id]){
            score+=question.marks;
        }
        totalMarks+=question.marks;
        correctAnswers++;   
        responsesArray.push({
            questionId:question._id,
            selectedOption:responses[question._id],
            isCorrect:question.correctOption === responses[question._id]
        })
    };
    let percentage = (score/totalMarks)*100;

    //save result
    const result = new Result({
        userId:req.user._id,
        examId:exam._id,
        score,
        totalMarks,
        correctAnswers,
        totalQuestions:exam.questions.length,
        responses:responsesArray,
        percentage
    });

    await result.save();

    //update users exams Results
    req.user.examResults.push(result._id);
    await req.user.save();

    res.status(200).json({
        message:"Exam submitted successfully",
    })
    
}