const { default: mongoose } = require("mongoose");

async function connector(){
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("DBCON");
    })
}

module.exports = {connector}