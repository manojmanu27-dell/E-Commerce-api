const route = require('express').Router();
const { createUser, login } = require("../middleware")

route.post('/createUser', createUser)
route.post('/login', login)


module.exports = route;