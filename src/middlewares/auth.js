const {  decode: decodeToken } = require('../utils/token');

const checkAuth =  (req, res, next) => {
    const token = req.headers.authorization;
    const decoded_token = decodeToken(token)
    if(!decoded_token){
        return res.status(403).send({
            status: "error",
            message: "invalid token"
        })
        
    }
    req.user_id = decoded_token.id
    next();
}

module.exports = checkAuth;