const db = require('../config/db.config');
const { createNewProperty: createNewPropertyQuery, 
    findAllProperty: findAllPropertyQuery,
    findPropertyById: findPropertyIdQuery,
    updateProperty: updatePropertyQuery,
    soldProperty: soldPropertyQuery,
    deleteProperty: deletePropertyQuery
} = require('../database/queries');
const { logger } = require('../utils/logger');

class Property {
    constructor(owner, status, price, state, city, address, type, image_url) {
        this.owner = owner;
        this.status = status;
        this.price = price;
        this.state = state;
        this.city = city;
        this.address = address;
        this.type = type;
        this.image_url = image_url;
    }

    static create(newProperty, cb) {

        db.query(createNewPropertyQuery, 
            [
                newProperty.owner,
                newProperty.status,
                JSON.parse(newProperty.price),
                newProperty.state, 
                newProperty.city, 
                newProperty.address,
                newProperty.type,
                newProperty.image_url
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    owner: newProperty.owner,
                    status: newProperty.status,
                    price: newProperty.price,
                    state: newProperty.state,
                    city: newProperty.city,
                    address: newProperty.address,
                    type: newProperty.type,
                    image_url: newProperty.image_url,
                });
        });
    }

    static findAllProperty(cb){
        db.query(findAllPropertyQuery, (err, res) => {
            if(err){
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if(res.length){
                cb(null, res);
                return;
            }
        })
    }

    static findByPropertyId(property_id, cb){
        db.query(findPropertyIdQuery, property_id, (err, res) =>{
            if(err){
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if(res.length){
                cb(null, res[0]);
                return;
            }
            cb({kind: "not_found" }, null);
        })
    }

    static updateProperty(params, cb){
    // console.log(params, "<<PROPERTY");

        db.query(updatePropertyQuery, [
            params[0],
            JSON.parse(params[1])
        ], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, {
                id: params[0].owner,
                created_on: params[0].created_on,
                status: params[0].status,
                price: params[0].price,
                state: params[0].state,
                city: params[0].city,
                address: params[0].address,
                type: params[0].type,
                image_url: params[0].image_url,
            })
        });
    }

    static soldProperty(params, cb){
        db.query(soldPropertyQuery, [
            params[0],
            JSON.parse(params[1])
        ], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, {
                message: "success"
            })
        })
    }

    static deleteProperty(property_id, cb){
        db.query(deletePropertyQuery, property_id , (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, {
                message: "success"
            })
        })
    }
    
}

module.exports = Property;