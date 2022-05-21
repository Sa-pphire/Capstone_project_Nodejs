const Property = require("../models/property.model");



const authorizedProperty = (req, res, next) => {
    const property_id = req.params.property_id;
    const session_id = req.user_id;


    Property.findByPropertyId(property_id, (err, data) => {
        if(err) {
            if(err.kind === "not_found"){
                return res.status(404).send({
                    status: "error",
                    message: `Property with property_id ${property_id} was not found`
                });
            }
            return res.status(500).send({
                status: "error",
                message: err.message
            })
        }
        if(data){
            if(session_id === data.owner){
                req.queried_data = data; //returning the whole data queried from database
                // console.log(req.queried_data, "queried_data")
                next();
                return;
            }
            return res.status(403).send({
                error: "error",
                message: "You do not have authorization to change this property"
            })
        }
    })
}

module.exports = authorizedProperty