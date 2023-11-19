const jwt = require('jsonwebtoken');
const config = require('config')

module.exports = (uId, expiryTime = config.jwt.expiryTime) => {
    return new Promise(function (resolve, reject) {
        jwt.sign(
            {
                uId: uId
            }, config.jwt.secretKey, {
            expiresIn: expiryTime
        }, function(err,token){
            if(err){
                console.log("error while generating token");
                return reject("error")
            } else {
                console.log("the token is",token)
                return resolve(token);
            }
        }
        )
    })
}