const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');

// @desc  Get all Courses by Bootcamp
// @route GET /api/v1/courses
// @route GET /api/v1/bootcamps/:bootcampId/courses
// @acess Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find();
  }

  const data = await query;

  res.status(200).json({ sucess: true, count: data.length, data: data });
});