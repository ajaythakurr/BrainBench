const express = require("express");
const cors = require("cors");
const app  = express();
const userRouter = require("./routes/user");
const examRouter = require("./routes/exam");



app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("api is running");
})


//user routes
app.use("/user",userRouter);

//exam routes
app.use("/exam",examRouter);


app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
  });

module.exports = app;

