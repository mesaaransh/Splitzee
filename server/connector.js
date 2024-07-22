const { default: mongoose } = require("mongoose");

async function connector(){
    mongoose.connect('mongodb://localhost:27017/splitzee').then(() => {
        console.log("DBCON");
    })
}

module.exports = {connector}