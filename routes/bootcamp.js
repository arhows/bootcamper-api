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

const router = express.Router();

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/').get(getAllBootCamps).post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router.route('/').delete(notfoundBootcamp).put(notfoundBootcamp);

module.exports = router;
