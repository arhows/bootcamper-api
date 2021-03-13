const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');

// @desc  Get all bootcamps
// @route GET /api/v1/bootcamps
// @acess Public
exports.getAllBootCamps = async (req, res, next) => {
  try {
    const data = await Bootcamp.find();

    if (!data) {
      return res
        .status(400)
        .json({ sucess: false, msg: 'Bootcamps not found' });
    }

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// @desc  Get bootcamp by id
// @route GET /api/v1/bootcamps/:id
// @acess Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Bootcamp.findById(id);

    if (!data) {
      next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// @desc  Create new bootcamp
// @route POST /api/v1/bootcamps
// @acess Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({ sucess: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

// @desc  Update bootcamp
// @route PUT /api/v1/bootcamps/:ud
// @acess Private
exports.updateBootcamp = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

// @desc  Delete bootcamp
// @route DEL /api/v1/bootcamps/:ud
// @acess Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

exports.notfoundBootcamp = (req, res) => {
  res
    .status(404)
    .json({ sucess: false, msg: '404 page, parameters not found!' });
};
