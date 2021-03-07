// @desc  Get all bootcamps
// @route GET /api/v1/bootcamps
// @acess Public
exports.getAllBootCamps = (req, res, next) => {
  res.status(200).json({ sucess: true, msg: 'Show all bootcamps' });
};

// @desc  Get bootcamp by id
// @route GET /api/v1/bootcamps/:id
// @acess Public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ sucess: true, msg: `Show bootcamp ${req.params.id} ` });
};

// @desc  Create new bootcamp
// @route POST /api/v1/bootcamps
// @acess Private
exports.createBootcamp = (req, res, next) => {
  res.status(201).json({ sucess: true, msg: 'Created bootcamp' });
};

// @desc  Update bootcamp
// @route PUT /api/v1/bootcamps/:ud
// @acess Private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ sucess: true, msg: `Updated bootcamp ${req.params.id}` });
};

// @desc  Delete bootcamp
// @route DEL /api/v1/bootcamps/:ud
// @acess Private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ sucess: true, msg: `Deleted bootcamp ${req.params.id}` });
};
