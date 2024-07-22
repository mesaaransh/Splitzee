import { useNavigate } from "react-router-dom";
import "./Sidebar.css"
import { TbPlus } from "react-icons/tb";
import { TbTrashX } from "react-icons/tb";
import AddTrip from "../Forms/AddTrip";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../config";
import dateFormat from "dateformat";

export default function Sidebar(props: any) {

    let [display, setDisplay] = useState(false);
    let [trips, setTrips] = useState([]);

    useEffect(() => {Fetcher()}, []);
    async function Fetcher(){
        let token = sessionStorage.getItem('token')
        axios.get(config.apiURL + 'trip', {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'token': token
            },
        }).catch((err) => {
            console.log(err);
        }).then((resp: any) => {
            setTrips(resp.data)
        })
    }
    
    return (
        <>
        <AddTrip display={display} setDisplay={setDisplay} trips={trips} setTrips={setTrips}/>
        <div className="sidebar">

            <div className="sidebarProfile">
                <h4>
                    {props.name}
                </h4>
                <div className="sidebarProfilePic"></div>
            </div>
            
            <SidebarCategory name="Trips" setDisplay={setDisplay}>
                {
                    trips.map((trip: any) => (
                        <CategoryItem name={trip.name} date={dateFormat(trip.startDate, 'dS mmmm yyyy')} id={trip._id} trips = {trips} setTrips = {setTrips} />
                    ))
                }
            </SidebarCategory>

            <hr />

        </div>
        </>
    )
}



















function SidebarCategory({name, setDisplay, children}: any) {

    return(
        <div className="sidebarCategory">
            <div className="sidebarCategoryTitle">
                <h2>{name}</h2>
                <div className="addButton" onClick={() => {setDisplay(true)}} ><TbPlus/></div>
            </div>

            <div className="sidebarCategoryItems">
                {children}
            </div>
        </div>
    )

}

function CategoryItem({name, date, id, trips, setTrips}: any) {

    const navigator = useNavigate();

    function clickHandler(){
        navigator('./trip/' + id)
    }

    async function deleteHandle(){

        let token = sessionStorage.getItem('token')
        axios.delete(config.apiURL + 'trip/' + id, {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'token': token
            }
        }).catch((err) => {
            console.log(err);
        }).then((resp) => {
            console.log(resp);
            if(resp && resp.status == 200){
                let filterTrips = trips.filter((trip:any) => (trip._id != id))
                setTrips(filterTrips)
                navigator('/user/home')
            }
        })

    }

    return(
        <div className="sidebarCategoryItem" onClick={clickHandler}>
            <div className="sidebarCategoryItemIcon"> </div>

            <div>
                <h4>{name}</h4>
                <h5>{date}</h5>
            </div>

            <div className="sidebarCategoryItemDeleteIcon" onClick={deleteHandle}> <TbTrashX/> </div>
        </div>
    )
}
