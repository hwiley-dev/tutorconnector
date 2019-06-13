const express = require('express');
const router = express.Router();

// @route GET api/
// @desc Test route
// @access
router.get('/', (req,res) =>  res.send('user route'));

module.exports = router