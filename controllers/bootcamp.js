const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const Bootcamp = require('../models/Bootcamp');
const { geocode } = require('../utils/geocoder');

// @desc  Get all bootcamps
// @route GET /api/v1/bootcamps
// @acess Public
exports.getAllBootCamps = asyncHandler(async (req, res, next) => {
  let query;

  // copy req.query
  const reqQry = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQry
  removeFields.forEach((param) => delete reqQry[param]);

  // Creatre query string
  let qryParams = JSON.stringify(reqQry);

  // Create operators ($gt, $gte, etc)
  qryParams = qryParams.replace(
    /\b(lt|lte|gt|gte|in)\b/g,
    (match) => `$${match}`
  );

  // Fiding resource
  // query = Bootcamp.find(JSON.parse(qryParams));
  // query = Bootcamp.find(JSON.parse(qryParams)).populate('courses');
  query = Bootcamp.find(JSON.parse(qryParams)).populate({
    path: 'courses',
    select: 'title description tuition',
  });

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
    // console.log(query);
  }

  // sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const totalPages = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Execute query
  const data = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < totalPages) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res
    .status(200)
    .json({ sucess: true, count: data.length, pagination, data: data });
});

// @desc  Get bootcamp by id
// @route GET /api/v1/bootcamps/:id
// @acess Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const data = await Bootcamp.findById(id).populate({
    path: 'courses',
    select: 'title description tuition',
  });

  if (!data) {
    next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json(data);
});

// @desc  Create new bootcamp
// @route POST /api/v1/bootcamps
// @acess Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({ sucess: true, data: bootcamp });
});

// @desc  Update bootcamp
// @route PUT /api/v1/bootcamps/:ud
// @acess Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const data = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!data) {
    next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ sucess: true, data: data });
});

// @desc  Delete bootcamp
// @route DEL /api/v1/bootcamps/:ud
// @acess Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const data = await Bootcamp.findByIdAndDelete(id);

  if (!data) {
    next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res
    .status(200)
    .json({ sucess: true, msg: `Deleted bootcamp id ${id} sucessfully` });
});

// @desc  Get bootcamps within a radius
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @acess Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/long from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const data = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({ sucess: true, count: data.length, data: data });
});

exports.notfoundBootcamp = (req, res) => {
  res.status(404).json({ sucess: false, msg: '404 page, router not found!' });
};
