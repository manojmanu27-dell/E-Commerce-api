const bcrypt = require('bcrypt');
const { Users } = require('../schemas');
const { connectionDb } = require('../db');

module.exports = (req, res) => {
    return new Promise(async function (resolve, reject) {
        try {
            await connectionDb();
            let isUserPresent = await Users.findOne({ email: req.body.email });
            console.log("isUserPresent", isUserPresent)
            if (isUserPresent) {
                const decrypt = bcrypt.compareSync(req.body.password, isUserPresent.password);// takes pwd user entered and the hash key for that user and compares it 
                console.log("user entered pwd crct :", decrypt)
                if (decrypt) {
                    res.status(200).json({
                        status: "Success",
                        errorCode: "",
                        message: "User AUTHENTICATED Successfully"
                    })
                    return resolve("Success")
                }
                res.status(500).json({
                    status: "Fail",
                    errorCode: "L02",
                    message: `Invalid Password`,
                })
            }
        } catch (error) {
            res.status(500).json({
                status: "Fail",
                errorCode: "L01",
                message: `Internal Server error Please contact Support Team`,
                errorMessage: error.message
            })
            return reject("error");
        }

    })

}