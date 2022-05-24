const Property = require('../models/property.model');

// get all properties
exports.getProperties = (req, res, next) => {
  Property.findAllProperty((err, properties) => {
    if(err) {
      res.status(500).json({
        status: 'error',
        message: err.message
      });
    } else {
      res.status(201).json({
        status: 'success',
        data: properties
      });
    }
  });
};
//get a single property
exports.getProperty = (req, res, next) => {
  const property_id = req.params.property_id; // get id from reqeust
  Property.findByPropertyId(property_id, (err, property) => {
    if(err) {
      res.status(500).json({
        status: 'error',
        message: err.message
      });
    } else {
      res.status(201).json({
        status: 'success',
        data: property
      })
    }
  })
}

