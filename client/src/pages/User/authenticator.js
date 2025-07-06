import axios from "axios";
import config from "../../config";

async function authenticator() {

    try{
        let token = sessionStorage.getItem('token') || '';
        let data = await axios.post(config.apiURL + 'verify', { token })
        .catch((err) => {
            return err;
        })

        if(data.status !== 200) {
            sessionStorage.removeItem('token');
            return false;
        }

        return true;
    }
    catch(err) {
        sessionStorage.removeItem('token');
        return false;
    }

}

export default authenticator;