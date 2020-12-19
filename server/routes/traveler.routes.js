const router = require('express').Router();
const { Trip, User } = require('../models');

// restful api
// /api/todo/
router
  .route('/')
  .get((req, res) => {
    User
      .find({})
      .then(data => {
        res.json({ success: true, data });
      })
      .catch(err => {
        res.json({ success: false });
      });
  })
  .post((req, res) => {
    console.log({ reqBody: req.body });

    User
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName
      })
      .then(data => {
        res.json({ success: true, data });
      })
      .catch(err => {
        res.json({ success: false });
      });
  });


// /api/todo/:id
router
  .route('/:id')
  .delete((req, res) => {
    console.log(req.params);

    Todo
      .findByIdAndDelete(req.params.id)
      .then(data => {
        res.json({ success: true });
      })
      .catch(err => {
        res.json({ success: false });
      });
  });

module.exports = router;