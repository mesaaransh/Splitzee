import axios from "axios";
import config from "../../../config";
import { groupBy } from "lodash";

async function tripFetcher(id){

    let trip = await axios.get(config.apiURL + 'trip/' + id, {
        headers: {
            token: sessionStorage.getItem('token')
        }
    })

    const grouped = groupBy(trip.data.transactions, 'date');

    const sortedGrouped = Object.fromEntries(
    Object.entries(grouped)
        .sort(([a], [b]) => new Date(a) - new Date(b)) // ascending
    );
    
    return {
        raw: trip.data,
        grouped: {
        ...trip.data,
        transactions: sortedGrouped
    }};
}

export default tripFetcher;