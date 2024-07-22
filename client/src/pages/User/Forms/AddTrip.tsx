import { useState } from "react";
import "./Froms.css"

import { FaXmark } from "react-icons/fa6"
import axios from "axios";
import config from "../../../config";
import waiter from "../../../waiter";

export default function AddTrip({ display, setDisplay, trips, setTrips }: any) {

    let [formData, setFormData] = useState({})

    function closeHandle() {
        setDisplay(false);
    }

    function inputHandler(e: any) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    function submitHandler(e: any) {

        e.preventDefault();
        let token = sessionStorage.getItem('token');

        axios.post(config.apiURL + 'trip', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'token': token
            }
        }).catch((err) => {
            console.log(err);
        }).then(async (resp) => {

            if (resp && resp.status == 200) {
                setTrips([
                    ...trips,
                    resp.data
                ])
                await waiter(1000);
                setDisplay(false)
            }
            
        })

    }

    return (
        <>
            <div className="popupblur" style={{ display: display ? 'flex' : 'none' }}></div>
            <div className="popupFrom" style={{ display: display ? 'flex' : 'none' }}>
                <h2>Trip Details</h2>

                <form className="form" onSubmit={submitHandler}>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" onChange={inputHandler} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="date">Start Date</label>
                            <input type="date" name="startDate" id="date" onChange={inputHandler} />
                        </div>
                    </div>

                    <button type="submit">Save Details</button>
                </form>

                <div className="closeButton" onClick={closeHandle}>
                    <FaXmark />
                </div>
            </div>
        </>
    )
}
