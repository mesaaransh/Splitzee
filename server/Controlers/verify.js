var jwt = require('jsonwebtoken');
const { config } = require('../config');

async function verify(req, res) {
    try {
        let data = req.body
        let token = ""
        token = data.token

        let isValid = false
        isValid = jwt.verify(token, config.jwtkey)
        if (isValid) {
            res.status(200);
            res.send(isValid);
        }
        else {
            res.status(401);
            res.send(token);
        }
    } catch (error) {
        res.status(400);
        res.send("Cannot Authenticate Token")
    }

}

module.exports = {verify}