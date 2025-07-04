const { default: mongoose } = require("mongoose")

let activityModel = new mongoose.Schema({
    user: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
},{
    timestamps: true
}
)

module.exports = mongoose.model('Activty', activityModel)