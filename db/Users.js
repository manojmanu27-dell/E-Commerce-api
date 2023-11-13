const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Users = new Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    failCount: {
        type: Number
    },
    activeFlag: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date
    }
},{
    versionKey:false
})

module.exports = mongoose.model("Users",Users);