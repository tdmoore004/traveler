const router = require('express').Router();
const traveler = require('./traveler.routes');

// /api/todo
router.use('/api/traveler', traveler);

module.exports = router;