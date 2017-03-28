'use strict';
const path = require('path');
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
router.get('/', function(req, res, next) {
  res.render('');
});
// YOUR CODE HERE

module.exports = router;
