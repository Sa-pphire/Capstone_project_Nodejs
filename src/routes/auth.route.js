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

module.exports = router;