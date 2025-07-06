import axios from "axios";
import config from "../../../../../config";

async function inviter(data){

    return axios.post(config.apiURL + 'member', data, {
        headers:{
            token: sessionStorage.getItem('token')
        }
    })

}

export default inviter;