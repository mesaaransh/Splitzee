const expense = require("../Models/expense");
const trip = require("../Models/trip");

async function addExpense(req, res){

    try {

        let data = req.body;
        let newData = {
            ...data,
            trip: data.tripId
        }
        let currTrip = await trip.findById(data.tripId);
        let newExpense = new expense(newData);

        currTrip.transactions.push(newExpense._id);
        await currTrip.save();
        await newExpense.save();

        res.status(200);
        let sendData = await (await currTrip.populate('transactions')).populate('members', 'name phone email')
        res.send(sendData)

    } catch (error) {
        console.log(error);
        res.status(400);
        res.send(error);
    }

}

module.exports = { addExpense }