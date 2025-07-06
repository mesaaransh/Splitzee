import axios from "axios";
import config from "../../../../../config";

async function addExpense(expenseData) {
    try {
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