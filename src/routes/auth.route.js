const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const { signup: signupValidator, 
    signin: signinValidator, 
    property: propertyValidator,
    
 } = require('../validators/auth');
const authController = require('../controllers/auth.controller');
const checkAuth = require('../middlewares/auth');
const authorizedProperty = require('../middlewares/propertyAuthorization');


router.route('/signup')
    .post(signupValidator, asyncHandler(checkEmail), asyncHandler(authController.signup));

router.route('/signin')
    .post(signinValidator, asyncHandler(authController.signin));

router.route('/property')
    .post(checkAuth, propertyValidator,  asyncHandler(authController.property))

router.route('/property/:property_id')
    .patch(checkAuth, propertyValidator, asyncHandler(authorizedProperty), asyncHandler(authController.updateProperty) )

router.route('/property/:property_id/sold')
    .patch(checkAuth, asyncHandler(authorizedProperty), asyncHandler(authController.soldProperty))

router.route('/property/:property_id')
    .delete(checkAuth, asyncHandler(authorizedProperty), asyncHandler(authController.deleteProperty))

module.exports = router;