const User = require('../models/user.model');
const Property = require('../models/property.model');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken, decode: decodeToken } = require('../utils/token');

exports.signup = (req, res) => {
    const { firstname, lastname, email, password, phone, address } = req.body;
    const hashedPassword = hashPassword(password.trim());

    const is_admin = true;
    const user = new User(firstname.trim(), lastname.trim(), email.trim(), hashedPassword, phone.trim(), address.trim(), is_admin);

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });  //path 1
        } else {
            const token = generateToken(data.id);
            res.status(201).send({
                status: "success",
                data: {
                    token,
                    data
                }
            }); //path 2
        }
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email.trim(), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with email ${email} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data) {
            if (comparePassword(password.trim(), data.password)) {
                const token = generateToken(data.id);
                res.status(200).send({
                    status: 'success',
                    data: {
                        token,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        email: data.email
                    }
                });
                return;
            }
            res.status(401).send({
                status: 'error',
                message: 'Incorrect password'
            });
        }
    });

}

exports.property = (req, res) => {
    const { price, state, city, address, type, image_url } = req.body;
    const status = "available";
    const owner = req.user_id;
   
    
    const property = new Property( owner, status, price, state.trim(), city.trim(), address.trim(), type.trim(), image_url.trim());
    // console.log(req.user_id)

    Property.create(property, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(201).send({
                status: "success",
                data: {
                    data
                }
            });
        }
    });
};


exports.updateProperty = (req, res) => {
    const { status, created_on } = req.queried_data;
    const property_id = req.params.property_id
    const owner = req.user_id;
    const { price, state, city, address, type, image_url } = req.body;
    
    const property = new Property( owner, status, price, state.trim(), city.trim(), address.trim(), type.trim(), image_url.trim());
    property.created_on = created_on;
    let params = [
        property,
        property_id
    ];

    Property.updateProperty(params, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(201).send({
                status: "success",
                data: {
                    data
                }
            });
        }
    });
    

    return;
};


exports.soldProperty = (req, res) => {
    const status = "sold";
    const { created_on, price, state, city, address, type, image_url } = req.queried_data;
    const property_id = req.params.property_id
    const owner = req.user_id;
    // const { price, state, city, address, type, image_url } = req.body;
    
    const property = new Property( owner, status, price, state.trim(), city.trim(), address.trim(), type.trim(), image_url.trim());
    property.created_on = created_on;
    let params = [
        status,
        property_id
    ];
    
    Property.soldProperty(params, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            
            res.status(201).send({
                status: "success",
                data: {
                    property
                }
            });
        }
    });

    return;
};


exports.deleteProperty = (req, res) => { 
    const { status, created_on, price, state, city, address, type, image_url } = req.queried_data;
    const property_id = req.params.property_id
    const owner = req.user_id;
    
    const property = new Property( owner, status, price, state.trim(), city.trim(), address.trim(), type.trim(), image_url.trim());
    property.created_on = created_on; // path 1
    
    
    Property.deleteProperty(property_id, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });  //path 2
        } else {
            
            res.status(201).send({
                status: "success",
                data: {
                    property
                }
            });  //path 3
        }
    });

    return;
};