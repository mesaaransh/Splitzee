import "./Sidebar.css"
import dateFormat from "dateformat";
import { TbPlus } from "react-icons/tb";
import { TbTrashX } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import tripFetcher from "./tripFetcher";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import AddTrip from "./AddTrip";
import { useRef } from "react";
import tripDeleter from "./tripDeleter"
import { LuTicketsPlane } from "react-icons/lu";

export default function Sidebar() {

    let userData = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')) : {};
    let navigator = useNavigate();

    function logouthandle() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userData');
        navigator('/login');
    }

    let trips = useQuery({
        queryKey: ['trips'],
        queryFn: tripFetcher,
        refetchOnWindowFocus: false,
    })

    return (
        <>

            <div className="sidebar">
                <div className="sidebarContainer">

                    <div className="sidebarProfile">
                        <div>
                            <h4>
                                {userData.name}
                            </h4>
                            <p>{userData.email}</p>
                        </div>
                        <div className="sidebarProfilePic">
                            <img src={userData.profilePhoto} alt={userData.name} />
                        </div>
                    </div>

                    <SidebarCategory name="Trips">
                        {
                            trips.isFetching || trips.isLoading ?
                                <>Fetching details...</>
                                :
                                trips.data.length ?
                                    trips?.data.map((trip) => (
                                        <>
                                            <CategoryItem key={trip._id} trip={trip} />
                                        </>
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



















function SidebarCategory({ name, children }) {

    let tripRef = useRef();

    return (
        <div className="sidebarCategory">
            <AddTrip ref={tripRef} />
            <div className="sidebarCategoryTitle">
                <h2>{name}</h2>
                <div className="addButton" onClick={() => tripRef.current?.open()}><TbPlus /></div>
            </div>

            <div className="sidebarCategoryItems">
                {children}
            </div>
        </div>
    )

}

function CategoryItem({ trip }) {

    let {id} = useParams()

    let navigator = useNavigate();
    let userData = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')) : {};
    let query = useQueryClient()


    let deleter = useMutation({

        mutationFn: (d) => tripDeleter(d),
        onSuccess: () => {
            query.invalidateQueries(['trip', trip._id]);
            navigator('/user/home')
            alert(`Deletion of ${trip.name} successfull`);
        },
        onError: () => {
            alert('There was a problem deleting')
        }

    })

    function delHandle() {
        deleter.mutate(trip._id)
    }

    return (
        <div className={`sidebarCategoryItem ${id == trip._id?"activeSidebarItem":""}`} onClick={() => navigator('./trip/' + trip._id)}>

            <div className="sidebarCategoryItemIcon">
                <LuTicketsPlane />
            </div>

            <div>
                <h4>{trip.name}</h4>
                <h5>{dateFormat(trip.startDate, "dS mmmm yyyy")}</h5>
            </div>

            <div className="sidebarCategoryItemDeleteIcon">
                {
                    trip.owner === userData._id
                        ? <h2 onClick={delHandle}> <TbTrashX /> </h2>
                        : <></>
                }
            </div>

        </div>
    )
}
