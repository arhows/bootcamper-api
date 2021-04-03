const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

// @desc  Get all Courses by Bootcamp
// @route GET /api/v1/courses
// @route GET /api/v1/bootcamps/:bootcampId/courses
// @acess Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    // query = Course.find();
    // query = Course.find().populate('bootcamp');
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description',
    });
  }

  const data = await query;

  res.status(200).json({ sucess: true, count: data.length, data: data });
});

// @desc  Get Course by Id
// @route GET /api/v1/course/:id
// @acess Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const data = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!data) {
    return next(
      new ErrorResponse(`No course with the id if ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ sucess: true, data: data });
});

// @desc  Add new Course
// @route PUT /api/v1/bootcamps/:bootcampId/courses
// @acess Privatr
exports.createCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp with id of ${req.params.bootcampId} not found!`,
        404
      )
    );
  }

  const data = await Course.create(req.body);

  res.status(200).json({ sucess: true, data: data });
});

// @desc  Update Course by Id
// @route PUT /api/v1/course/:id
// @acess Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let data = await Course.findById(req.params.id);

  if (!data) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    );
  }

  data = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ sucess: true, data: data });
});

// @desc  Delete Course by Id
// @route DEL /api/v1/course/:id
// @acess Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  let data = await Course.findById(req.params.id);

  if (!data) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    );
  }

  await Course.remove();

  res.status(200).json({ sucess: true, data: {} });
});
