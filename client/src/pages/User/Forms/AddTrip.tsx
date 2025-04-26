import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6"
import axios from "axios";
import config from "../../../config";
import "./Froms.css"

export default function AddTrip({ display, setDisplay }: any) {

    let [formData, setFormData] = useState({})
    const queryClient = useQueryClient()

    function closeHandle() {
        setDisplay(false);
    }

    function inputHandler(e: any) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const trip = useMutation({
        mutationKey: ['addTrip'],
        mutationFn: (formData: any) => (
            axios.post(config.apiURL + 'trip', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'token': sessionStorage.getItem('token')
                }
            }).then((data) => (data.data))
        ),
        onSuccess: async () => {
            setDisplay(false);
            queryClient.invalidateQueries({ queryKey: ['Trips'] })
        }
    })

    function submitHandler(e: any) {
        e.preventDefault();
        trip.mutate(formData)
    }

    return (
        <>
            <div className="popupblur" style={{ display: display ? 'flex' : 'none' }}></div>
            <div className="formContainer" style={{ display: display ? 'flex' : 'none' }}>
                <div className="popupFrom">
                    <h2>Trip Details</h2>
                    
                    {
                        trip.isPending?
                        <></>
                        :
                        <form className="form" onSubmit={submitHandler}>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" id="name" required onChange={inputHandler} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="date">Start Date</label>
                                    <input type="date" name="startDate" id="date" required onChange={inputHandler} />
                                </div>
                            </div>

                            <button type="submit">Add Trip</button>
                        </form>
                    }

                    <div className="closeButton" onClick={closeHandle}>
                        <FaXmark />
                    </div>
                </div>
            </div>
        </>
    )
}
