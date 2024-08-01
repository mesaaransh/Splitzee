var jwt = require('jsonwebtoken');
const { config } = require('../../config');

async function auth(req, res, next){

    try {

        let token = req.headers.token;
        if(token){
            isValid = jwt.verify(token, config.jwtkey)
            if(isValid){
                req.tokenData = isValid;
                next();
            }
            else{
                throw('Cannot Authenticate Token')
            }
        }
        else{
            throw('No Token')
        }

    } catch (error) {
        res.status(401);
        console.log(error);
        res.send("Cannot Authenticate Token")
    }

}

module.exports = {auth}