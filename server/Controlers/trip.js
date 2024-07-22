const trip = require("../Models/trip");


async function getTrips(req, res){

    let tokenData = req.tokenData

    try {
        let trips = await trip.find({members: [tokenData.id]}, 'name startDate');
        res.status(200);
        res.send(trips);

    } catch (error) {
        res.status(400);
        res.send(error);
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

async function deleteTrip(req, res){

    let tripId = req.params.id;
    let currTrip = await trip.findById(tripId);
    let tokenData = req.tokenData;

    if(currTrip.owner == tokenData.id){
        await trip.findByIdAndDelete(tripId)
        res.status(200);
        res.send({})
    }
    else{
        res.status(401);
        res.send("zyada chod mein?")
    }

}

module.exports = {getTrips, addTrip, deleteTrip}