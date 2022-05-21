const Joi = require('joi');
const validatorHandler = require('../middlewares/validatorHandler');

const signup = (req, res, next) => {
    const schema = Joi.object().keys({
        firstname: Joi.string()
            .trim()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        lastname: Joi.string()
            .trim()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        email: Joi.string()
            .trim()
            .email()
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
        
        phone: Joi.string()
        .trim()
        .alphanum()
        .min(9)
        .max(15)
        .required(),
        address: Joi.string()
        .trim()
        .min(4)
        .max(50)
        .required(),
    });
    validatorHandler(req, res, next, schema);
};

const signin = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string()
            .trim()
            .email()
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
    });
    validatorHandler(req, res, next, schema);
};


const property = ( req, res, next) =>{
    const schema = Joi.object().keys({
        price: Joi.number()
            .greater(5.00)
            .precision(2)
            .min(5)
            .required(),
        state: Joi.string()
            .trim()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        city: Joi.string()
            .trim()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        address: Joi.string()
            .trim()
            .min(3)
            .max(150)
            .required(),
        type: Joi.string()
            .trim()
            .min(3)
            .max(50)
            .required(),
        image_url: Joi.string()
            .trim()
            .uri()
            .required(),
        

            
        });
        validatorHandler(req, res, next, schema);
};

module.exports = {
    signup,
    signin,
    property
};