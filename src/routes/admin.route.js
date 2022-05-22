const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const {property: propertyValidator,} = require('../validators/auth');
const adminController = require('../controllers/admin.controller');
const checkAuth = require('../middlewares/auth');
const authorizedProperty = require('../middlewares/propertyAuthorization');


router.route('/property')
    .post(checkAuth, propertyValidator,  asyncHandler(adminController.property))

router.route('/property/:property_id')
    .patch(checkAuth, propertyValidator, asyncHandler(authorizedProperty), asyncHandler(adminController.updateProperty) )

router.route('/property/:property_id/sold')
    .patch(checkAuth, asyncHandler(authorizedProperty), asyncHandler(adminController.soldProperty))

router.route('/property/:property_id')
    .delete(checkAuth, asyncHandler(authorizedProperty), asyncHandler(adminController.deleteProperty))

module.exports = router;