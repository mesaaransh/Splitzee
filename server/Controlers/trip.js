const trip = require("../Models/trip");
const user = require("../Models/user");


async function getTrips(req, res){

    let tokenData = req.tokenData

    try {
        let trips = await trip.find({members: {$in: [tokenData.id]}}, 'name startDate owner');
        res.status(200);
        res.send(trips);

    } catch (error) {
        res.status(400);
        res.send(error);
    }

}

async function getTrip(req, res){

    try{
        let id = req.params.id;
        let tokenData = req.tokenData;

        let currTrip = await trip.findById(id);

        if(currTrip){
            if(currTrip.members.includes(tokenData.id)){
                currTrip = await trip.findById(id).populate('members', 'name email phone').populate('transactions');
                res.status(200);
                res.send(currTrip);
            }
            else{
                throw("Pair chadar mein rakho")
            }
        }
        else{
            throw("Trip not Found")
        }    
    }
    catch(err){
        res.status(400);
        console.log(err);
        res.send(err)
    }

}

async function addTrip(req, res){

    try {

        let data = req.body;
        let tokenData = req.tokenData

        if(data){
            let newTrip = new trip(data);
            newTrip.members.push(tokenData.id);
            newTrip.owner = tokenData.id;
            await newTrip.save();

            res.status(200);
            res.send(newTrip)
        }
        else{
            throw("Data not found")
        }

        
    } catch (error) {
        
        res.status(400);
        res.send(error)

    }

}

async function addMember(req, res){

    try {
        
        let {friendId, tripId} = req.body;
        let tokenData = req.tokenData;

        let currUser = await user.findById(tokenData.id);
        let currTrip = await trip.findById(tripId);

        let isValid = currUser.friends.includes(friendId) && currTrip.members.includes(tokenData.id);

        if(isValid){
            if(!currTrip.members.includes(friendId)){
                currTrip.members.push(friendId)
                await currTrip.save();

                let tripData = await trip.findById(tripId).populate('members').populate('transactions')
                res.status(200);
                res.send(tripData);
            }
            else{
                throw("User exists in trip")
            }
        }
        else{
            throw("Invalid Authorization")
        }


    } catch (error) {
        res.status(400);
        res.send(error)
    }

}

async function deleteTrip(req, res){

    try{
        let tripId = req.params.id;
        let currTrip = await trip.findById(tripId);
        let tokenData = req.tokenData;
    
        if(currTrip.owner == tokenData.id){
            await trip.findByIdAndDelete(tripId)
            res.status(200);
            res.send({})
        }
        else if(currTrip.members.include(tokenData.id)){
            currTrip.members.splice(currTrip.members.indexOf(tokenData.id), 1);
            currTrip.save();
        }
        else{
            res.status(401);
            res.send("zyada chod mein?")
        }
    }
    catch(err){
        res.status(400);
        res.send(err)
    }

}

module.exports = {getTrips, getTrip, addTrip, addMember, deleteTrip}