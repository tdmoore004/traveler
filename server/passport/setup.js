// Import packages and modules 
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.js");

//Sequelize serialize and deserialize host in order to help keep authentication state across HTTP requests 
//Boiler plate needed to make it all work 
passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id, (error, user) => {
        cb(error, user);
    });
});

//Set up passport Local Stragey (use pasport LocalStrategy) and login with host's email and password 
passport.use(new LocalStrategy(
    //host sign in with an email rather than with a username
    {
        usernameField: "email",
        passwordField: "password"
    },
    ((email, password, done) => {
        //when a host clicks LOGIN button, this code runs
        User.findOne({ email: email
        }).then((user) => {
            //If there is no host in the database with given email
            console.log(user);
            if (!user) {
                console.log("wrong email")
                return done(null, false, {message: "Incorrect email."});
                //if there is matching email but no matching password in the database
            } 
            // else if (!user.validPassword(password)) {
            //     console.log("wrong password")
            //     return done(null, false, {message: "Incorrect password."});
            // } 
            // //If find matching email and password, return the host to the route handler
            // console.log(user);
            // return done(null, user);
            else {
                bcrypt.compare(password, user.password, (error, isMatch) => {
                    console.log(user);
                    if (error) throw error;

                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "Incorrect Password" })
                    }
                });
            } 
            //If find matching email and password, return the host to the route handler
        }).catch(error => {
            console.log(error);
            return done(null, false, { message: "Error" })
        });

    })
));

//Export the configured passport 
module.exports = passport; 