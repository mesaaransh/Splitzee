import axios from "axios";

async function authenticator() {

    let token = sessionStorage.getItem('token') || '';

    let data = await axios.post(config.apiURL + 'verify', { token }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).catch((err) => {
        console.log(err);
    })

    return data.data;

}

export default authenticator;