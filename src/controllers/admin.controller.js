const Property = require('../models/property.model');


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
    let propertyParameter = [
        property,
        property_id
    ];

    Property.updateProperty(propertyParameter, (err, data) => {
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
    let propertyParameter = [
        status,
        property_id
    ];
    
    Property.soldProperty(propertyParameter, (err, data) => {
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