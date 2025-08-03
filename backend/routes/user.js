const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const wrapasync = require("../utels/wrapAsync");


//signup route
router 
    .route("/signup")
    .get(userController.signupForm)
    .post(wrapasync(userController.signup))

//login route
router
    .route("/login")
    .get(userController.loginForm)
    .post(wrapasync(userController.login))

//logout route
router
    .route("/logout")
    .get(wrapasync(userController.logout))


module.exports = router;


