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
      .find({})
      .then(data => {
        res.json({ success: true, data });
      })
      .catch(err => {
        res.json({ success: false });
      });
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
      .then(data => {
        res.json({ success: true, data });
      })
      .catch(err => {
        console.log(err);
        res.json({ success: false });
      });
  });

router.post("/login", (req, res, next) => {
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
      return res.status(200).json({ success: `Logged in ${user.id}` });
    });
  })(req, res, next);
});

router.post('/add-trip', async (req, res) => {
  try {
    console.log(req.body);
    const trip = new Trip(req.body);
    await trip.save();

    const user = await User.findById({ _id: trip.user });
    console.log(user);
    user.trips.push(trip);
    await user.save();
    res.status(200).json({success:true, data: trip });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message })
  }

})

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