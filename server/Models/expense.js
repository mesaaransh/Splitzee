const { default: mongoose } = require("mongoose");

let expenseModel = new mongoose.Schema({

    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    financer: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: {
        type: [mongoose.Types.ObjectId],
        default: [],
        ref: 'User'
    },
    trip: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Trip'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Expense', expenseModel)