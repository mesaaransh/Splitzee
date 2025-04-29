import "./Sidebar.css"
import axios from "axios";
import { useState } from "react";
import dateFormat from "dateformat";
import config from "../../../config";
import AddTrip from "../Forms/AddTrip";
import { TbPlus } from "react-icons/tb";
import { TbTrashX } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Sidebar({ userData, setActiveTrip, activeTrip }: any) {

    console.log(userData);
    
    let [display, setDisplay] = useState(false);
    let navigator = useNavigate();

    const { data, isLoading, isFetching }: any = useQuery({
        queryKey: ['Trips'],
        queryFn: async () => {
            const res = await axios.get(config.apiURL + 'trip', {
                headers: {
                    'token': sessionStorage.getItem('token'),
                },
            });
            return res.data;
        },
    })

    function logouthandle() {
        sessionStorage.removeItem('token');
        localStorage.removeItem('token')
        navigator('/login')
    }

    return (
        <>
            <AddTrip display={display} setDisplay={setDisplay} trips={data} />
            <div className="sidebar">
                <div className="sidebarContainer">
                    <div className="sidebarProfile">
                        <div>
                            <h4>
                                {userData.name}
                            </h4>
                            <p>{userData.email}</p>
                        </div>
                        <div className="sidebarProfilePic"></div>
                    </div>

                    <SidebarCategory name="Trips" setDisplay={setDisplay}>
                        {
                            isFetching || isLoading ?
                                <>Fetching details...</>
                                :
                                data.length?
                                data?.map((trip: any) => (
                                    <CategoryItem setActiveTrip={setActiveTrip} active={activeTrip} key={trip._id} trip={trip} userId={userData.id}/>
                                ))
                                :
                                <>No Trips Yet!</>
                        }
                    </SidebarCategory>

                    <hr className="seperator" />
                    <button className="logout" onClick={logouthandle}>
                        <h4>Logout</h4>
                    </button>
                </div>

            </div>
        </>
    )
}



















function SidebarCategory({ name, setDisplay, children }: any) {

    return (
        <div className="sidebarCategory">
            <div className="sidebarCategoryTitle">
                <h2>{name}</h2>
                <div className="addButton" onClick={() => { setDisplay(true) }} ><TbPlus /></div>
            </div>

            <div className="sidebarCategoryItems">
                {children}
            </div>
        </div>
    )

}

function CategoryItem({ trip: { name, startDate: date, _id: id, owner }, userId, active, setActiveTrip }: any) {

    const navigator = useNavigate();
    const queryClient = useQueryClient();

    function clickHandler(){
        queryClient.invalidateQueries({queryKey: ['transactions']})
        setActiveTrip(id);
        navigator('./trip/' + id)
    }

    let delTrip = useMutation({

        mutationKey: ['DelTrip', id],
        mutationFn: () => (
            axios.delete(config.apiURL + 'trip/' + id, {
                headers: {
                    'token': sessionStorage.getItem('token')
                }
            })
        ),
        onSuccess: () => {
            window.alert('Trip Deleted')
            navigator('/user')
            queryClient.invalidateQueries({queryKey: ['Trips']})
        }

    })

    async function deleteHandle() {
        delTrip.mutate();
    }

    return (
        <div className={id==active?"sidebarCategoryItem activeSidebarItem":"sidebarCategoryItem"} onClick={clickHandler}>

            <div className="sidebarCategoryItemIcon"> </div>

            <div>
                <h4>{name}</h4>
                <h5>{dateFormat(date, "dS mmmm yyyy")}</h5>
            </div>

            <div className="sidebarCategoryItemDeleteIcon" onClick={deleteHandle}>
                {owner === userId? <TbTrashX /> : <></>}
            </div>

        </div>
    )
}
