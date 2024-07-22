const { default: mongoose } = require("mongoose");

let userModel = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    friends: {
        type: [mongoose.Schema.Types.ObjectId],
        defalut: [],
        ref: 'User'
    },
    requests: {
        type: [mongoose.Schema.Types.ObjectId],
        defalut: [],
        ref: 'User'
    }



}, {
    timestamps: true
})

module.exports = mongoose.model('User', userModel)