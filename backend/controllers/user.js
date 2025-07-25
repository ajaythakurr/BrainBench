const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const jwt_secret = process.env.JWT_SECRET;


//signup form
module.exports.signupForm = (req,res)=>{
    res.send("signup form");
}
//signup controller
module.exports.signup = async (req,res)=>{
    //get all data from body
    const {name,email,password,role}=  req.body;

    //all the data should exist
    if(!(name && email && password && role)) res.status(400).send("All fields are required");

    //check if the user already exists
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).send("User already exists"); 
    }

    //encrypt the password
    const encryptedPassword = await bcrypt.hash(password,10);

    //save the user in the database
    const user = await User.create({
        name,
        email,
        password: encryptedPassword,
        role
    })

    //generate a token for user and send it 
    var token = jwt.sign(
        {id: user._id,email: user.email},
         jwt_secret,
         {expiresIn: "1d"}
    );

    //send the token in the response
    user.token = token;
    user.password = undefined;

    res.status(201).json(user);

}

//login form
module.exports.loginForm =(req,res)=>{
    res.send("login form");
}
//login controller
module.exports.login = async (req,res)=>{
    //get the required data from body
    const {email,password} = req.body;
    //check if the user exists
    const user = await User.findOne({email});
    if(!user) return res.status(400).send("User not found");
    //check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect) return res.status(400).send("Invalid password");
    //generate a token for the user and send it in the response
    var token = jwt.sign(
        {id:user._id,email:user.email},
        jwt_secret,
        {expiresIn: "1d"} 

    );
    //send the token in the response 
    user.token = token;
    user.password = undefined;

    res.status(200).json(user);

}








