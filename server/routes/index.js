const router = require('express').Router();
const todos = require('./traveler.routes');

// /api/todo
router.use('/api/traveler', todos);

module.exports = router;