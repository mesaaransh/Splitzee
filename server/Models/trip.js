const { default: mongoose } = require("mongoose");

let tripModel = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    members:{
        type: [mongoose.Types.ObjectId],
        default: [],
        ref: 'User',
    },
    transactions:{
        type: [mongoose.Types.ObjectId],
        default: [],
        ref: 'Expense'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Trip', tripModel)