const jwt = require('jsonwebtoken');
const config = require("config");

module.exports = (token) => {
    return new Promise(function (resolve, reject) {
        try {


            if (token === undefined || token === "") {
                return reject("Invalid Token");
            }
            jwt.verify(token, config.jwt.secretKey, async function (err, decoded) {
                console.log("the error is", err)
                if (err) {
                    return reject("Some error has occured"+ err);
                }
                console.log('the decoded string is', decoded)
            })
        } catch (error) {
            console.log("error occured",error)
        }
    })
}