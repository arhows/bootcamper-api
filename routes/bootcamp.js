const express = require('express');

const {
  getAllBootCamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  notfoundBootcamp,
} = require('../controllers/bootcamp');

// Include other resource routers
const courseRouter = require('./course');

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/').get(getAllBootCamps).post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router.route('/').delete(notfoundBootcamp).put(notfoundBootcamp);

module.exports = router;
