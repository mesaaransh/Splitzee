import axios from 'axios';
import config from '../../../config';

async function tripFetcher() {

    return axios.get(config.apiURL + 'trip', {
        headers: {
            'token': sessionStorage.getItem('token')
        }
    }).then((data) => data.data);

}

export default tripFetcher;