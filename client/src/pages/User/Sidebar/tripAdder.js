import axios from "axios";
import config from "../../../config";

async function tripAdder(tripData){
    
    try {
        
        return axios.post(config.apiURL + 'trip', tripData, {
            headers: {
                token: sessionStorage.getItem('token')
            }
        })

    } catch (error) {
        console.log(error);
    }

}

export default tripAdder