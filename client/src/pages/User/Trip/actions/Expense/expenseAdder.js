import axios from "axios";
import config from "../../../../../config";

async function addExpense(expenseData) {
    try {
        
        let message = ''
        let userData = JSON.parse(sessionStorage.getItem('userData'));
        if(expenseData.financer == userData._id){
            message = `You paid ${expenseData.amount} on the trip ${expenseData.tripName}`
        }
        else{
            message = `Someone added Expense ${expenseData.amount} on the trip ${expenseData.tripName}`
        }
        
        await axios.post(config.apiURL + 'activity', {
            message: message
        },{
            headers: {
                token: sessionStorage.getItem('token')
            }
        })

        let resp = await axios.post(config.apiURL + 'expense', expenseData, {
            headers: {
                token: sessionStorage.getItem('token'),
            }
        });
        return resp.data;
    } catch (error) {
        console.error('Error adding expense:', error);
        throw error;
    }
}

export default addExpense;