const router = require('express').Router();
const { Trip, User } = require('../models');
const passport = require("../passport/setup.js")
const bcrypt = require("bcryptjs")

// restful api
// /api/traveler/
router
  .route("/")
  .get((req, res) => {
    User
      .find()
      .then(data => {
        res.json({ success: true, data });
      })
      .catch(err => {
        res.json({ success: false });
      });
  });

router
  .route("/trips/:id")
  .get((req, res) => {
    Trip
      .find({
        user: req.params.id
      })
      .then(data => {
        console.log(req.params)
        res.json({ success: true, data });
      })
      .catch(err => {
        console.log(err)
        res.json({ success: false });
      })
  });

//User signup/login route handler
router
  .route("/signup")
  .post((req, res) => {
    User
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
      })
      .then(user => {
        res.json(user.id);
      })
      .catch(err => {
        console.log(err);
        res.json({ success: false });
      });
  });

router
  .route("/login")
  .post((req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      if (!user) {
        return res.status(400).json({ errors: "No Users Found" });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(400).json({ errors: err });
        }
        return res.status(200).json(user.id);
      });
    })(req, res, next);
  });

router.post('/add-trip', async (req, res) => {
  try {
    // console.log(req.body);
    const trip = new Trip(req.body);
    await trip.save();

    const user = await User.findById({ _id: trip.user });
    // console.log(user);
    user.trips.push(trip);
    await user.save();
    res.status(200).json({ success: true, data: trip });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message })
  }
});

router.post('/add-event', async (req, res) => {
  try {
    // console.log(req.body);
    const event = (req.body);
    // console.log(event);
    const trip = await Trip.findById({ _id: "5ff3e4fcd0d34440296c26ff" });
    // console.log(trip);

    if (req.body.type === "activity") {
      trip.activity.push(event);
    } else if (req.body.type === "flight") {
      trip.flight.push(event);
    } else if (req.body.type === "lodging") {
      trip.lodging.push(event);
    }





    await trip.save();
    res.status(200).json({ success: true, data: trip });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message })
  }
});

// /api/todo/:id
// router
//   .route('/:id')
//   .delete((req, res) => {
//     console.log(req.params);

//     Todo
//       .findByIdAndDelete(req.params.id)
//       .then(data => {
//         res.json({ success: true });
//       })
//       .catch(err => {
//         res.json({ success: false });
//       });
//   });

module.exports = router;