var validator = require('validator');
const user = require('../Models/user');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;

async function verifyUser(req, res) {

    try {
        let data = req.body
        let currUser = await user.findOne({email: data.email}, 'name phone password email _id profilePhoto friends requests').populate('friends', 'name phone email profilePhoto').populate('requests', 'name phone email profilePhoto');

        if (currUser) {
            let isValid = await bcrypt.compare(data.password, currUser.password).catch((err) => { throw ("Email or Password not valid") });
            if (isValid) {
                let token = jwt.sign({
                    id: currUser._id,
                    email: currUser.email,
                },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '2 days'
                    }
                )
                res.status(200);
                res.send({
                    token: token,
                    userData: {
                    ...currUser._doc,
                    password: undefined,
                }});
            }
            else{
                throw ("Email or Password not valid")
            }
        }
        else {
            throw ("User Not Found")
        }

    }
    catch (error) {
        res.status(400)
        console.log(error)
        res.send(error)
    }

}

async function newUser(req, res) {
    try {
        let data = req.body;
        data.password = await bcrypt.hash(data.password, saltRounds).catch((err) => { throw (err) });
        isValid = validator.isEmail(data.email) && data.phone.length == 10;

        if (isValid) {
            let allusers = await user.find({ email: data.email })
            if (allusers.length == 0) {
                let newUser = new user(data);
                newUser.profilePhoto = `https://avatars.saaranshgupta.com/${newUser.gender}/${Math.floor(Math.random() * 10)}.jpg`
                await newUser.save();
                res.status(200)
                res.send(newUser)
            }
            else {
                throw ("User Exists")
            }
        } else {
            throw ("Enter Valid data")
        }
    }
    catch (err) {
        res.status(400);
        res.send(err);
    }

}


async function getFriends(req, res){

    try{
        let data = req.tokenData;
        let userData = await user.findOne({email: data.email}, 'name phone email friends requests').populate('friends', 'name phone email').populate('requests', 'name phone email');
        if(userData){
            res.status(200)
            res.send(userData)
        }else{
            throw('User not Found')
        }
    }
    catch(err){
        res.status(400);
        res.send(err)
    }

}

async function addRequest(req, res){

    try{
        let tokenData = req.tokenData;
        let data = req.body;

        let friends = await user.findOne({email: tokenData.email}, 'requests friends')
        let friend = await user.findOne({email: data.email}, '_id name email friends requests');
    
        if(friend != null){
            if(data.email == tokenData.email){
                throw("naah!");
            }

            if(!friend.requests.includes(friends._id) && !friend.friends.includes(friends._id)){
                friend.requests.push(friends._id);
                friend.save();
                res.status(200)
                res.send("Request Sent Successfully");
            }
            else{
                throw("Friend/Request Exists")
            }
        }
        else{
            throw('No user found')
        }
    }
    catch(err){
        res.status(400);
        res.send(err);
    }


}


async function addFriend(req, res){

    try{
        
        let id = req.params.id;
        let mode = req.query.mode
        let data = req.tokenData

        if(mode == 'accept'){

            let currUser = await user.findOne({email: data.email}, '_id friends requests');
            currUser.requests = currUser.requests.filter((req) => (req != id))
            if(!currUser.friends.includes(id)){
                currUser.friends.push(id);
            }
            await currUser.save()
            
            let friendUser = await user.findById(id, 'friends');
            if(!friendUser.friends.includes(currUser._id)){
                friendUser.friends.push(currUser._id);
            }
            await friendUser.save();

        }
        if(mode == 'reject'){
            let currUser = await user.findOne({email: data.email}, '_id friends requests');
            currUser.requests = currUser.requests.filter((req) => (req != id))
            await currUser.save()
        }

        let userData = await user.findOne({email: data.email}, 'name phone email friends requests').populate('friends', 'name phone email').populate('requests', 'name phone email');
        res.status(200);
        res.send(userData)

    }
    catch(err){
        res.status(400);
        res.send(err)
    }

}

module.exports = { newUser, verifyUser, getFriends, addRequest, addFriend }