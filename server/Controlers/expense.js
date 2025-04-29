const expense = require("../Models/expense");
const trip = require("../Models/trip");

async function addExpense(req, res){

    try {

        let data = req.body;
        let currTrip = await trip.findById(data.trip);
        let newExpense = new expense(data);
        
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


async function delExpense(req, res){

    try{

        let expenseId = req.params.id;
        await expense.findByIdAndDelete(expenseId)
        res.status(200);
        res.send({})

    }
    catch(err){
        res.status(400);
        res.send(err)
    }

}

module.exports = { addExpense, delExpense }