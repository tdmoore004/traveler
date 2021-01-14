const express = require('express');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

const passport = require("./passport/setup.js");
const routes = require('./routes');

const path = require('path');
const app = express();
require('./config/db')();

const PORT = process.env.PORT || 5000;

// parsing middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.use(
  session({ 
    secret: "secret traveler",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/service-worker.js", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/service-worker.js"));
  });  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
};

app.listen(PORT, () => {
  console.log('app running on PORT: ' + PORT);
});
