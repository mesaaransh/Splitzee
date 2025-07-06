import axios from "axios";
import config from "../../../../../config";

function expenseDeleter(id) {
    try{
        return axios.delete(config.apiURL + `expense/${id}`, {
            headers: {
                token: sessionStorage.getItem('token')
            }
        })    
    }
    catch (error) {
        console.error("Error deleting expense:", error);
        throw error;
    }
}

export default expenseDeleter;