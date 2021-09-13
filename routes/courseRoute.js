const express = require('express');
const router = express.Router();

const { Course } = require('./models')
const { asyncHandler } = require('./middleware/asyncHandler.js');

module.exports = router;