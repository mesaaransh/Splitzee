import axios from "axios";
import config from "../../../config";

async function tripDeleter(id) {

    return axios.delete(config.apiURL + 'trip/' + id, {
        headers: {
            token: sessionStorage.getItem('token')
        }
    })

}

export default tripDeleter