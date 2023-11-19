const Joi = require('joi');
const { Users } = require('../schemas');
const { connectionDb } = require('../db');
const bcrypt = require('bcrypt'); // One Way Hasing algorithm which hashes the provided pwd once and return a hash. and we can use compareSyc to know whether the given password is crct or not

module.exports = (req, res) => {

    return new Promise(async function (resolve, reject) {
        try {
            const userSchema = Joi.object({
                name: Joi.string().min(5).required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(8).required(),
            });
            const validateUser = userSchema.validate(req.body);
            console.log("Checking whether user is valid or not", validateUser);

            if (!validateUser.error) {
                await connectionDb();

                let userCheck = await Users.findOne({ email: req.body.email });
                if (userCheck) {
                    return res.status(500).json({
                        status: "Fail",
                        errorCode: "CU03",
                        message: `User Already Exists`
                    })
                }

                const saltRounds = 10;
                const salt = bcrypt.genSaltSync(saltRounds); // salt is like a secure string that has random alphabets special characters numbers etc which make the string more secure eg: 19&^%^&^jfhfhgi and the salt rounds is specified that to tell the genSaltSync function to loop over the final genrated hash 10 times so that it will generate a good salt and the more the rounds the more secure the key and the more resources it will use so 10 Is Most refered as it is best and efficient 
                const hashPwd = bcrypt.hashSync(req.body.password, salt); // will generate the has key by taking the password and salt as the input
                delete req.body.password;
                console.log("req is", req.body);
                
                Users.create({
                    user: req.body.name,
                    password: hashPwd,
                    email: req.body.email,
                }).then((resp) => {
                    console.log("User created Successfully");
                    return res.status(200).json({
                        status: "Success",
                        errorCode: "",
                        message: "User Created Successfully"
                    })
                })
                    .catch(err => console.log("error occured while creating user", err))
                    

            } else {
                res.status(500).json({
                    status: "Fail",
                    errorCode: "CU02",
                    message: `${validateUser.error.details[0].message}`
                })
            }
        } catch (error) {
            console.log("the error is", error.message)
            res.status(500).json({
                status: "Fail",
                errorCode: "CU01",
                message: `Internal Server error Please contact Support Team`,
                errorMessage: error.message
            })
        }

    })
}

// let obj = {
//     name: 'mj12',
//     email: 'manoj.com',
//     password: '12231232132321321oihh'
// }
// const userSchema = Joi.object({
//     name: Joi.string().min(5).required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(8).required(),
// });

// const validateUser = userSchema.validate(obj);

// console.log(validateUser.error.details[0].message)
// console.log(validateUser.error)