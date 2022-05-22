const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');

const propertyController = require('../controllers/property.controller');

router.route('/property')
    .get(asyncHandler(propertyController.getProperties));

router.route('/property/:property_id')
    .get(asyncHandler(propertyController.getProperty));



module.exports = router;