var jwt = require('jsonwebtoken');
const { config } = require('../config');
const user = require('../Models/user');

async function verify(req, res) {
    try {
        let data = req.body
        let token = ""
        token = data.token
        
        let isValid = false
        isValid = jwt.verify(token, process.env.JWT_KEY)
        if (isValid) {
            let currUser = await user.findById(isValid.id).select("-password -__v -createdAt -updatedAt");
            res.status(200);
            res.send(currUser);
        }
        else {
            res.status(401);
            res.send(token);
        }
    } catch (error) {
        res.status(400);
        res.send(error.message || "Invalid Token");
    }

}

module.exports = {verify}