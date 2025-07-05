import "./Sidebar.css"
import dateFormat from "dateformat";
import { TbPlus } from "react-icons/tb";
import { TbTrashX } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import tripFetcher from "./tripFetcher";

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
                                trips.data.length?
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

    return (
        <div className="sidebarCategory">
            <div className="sidebarCategoryTitle">
                <h2>{name}</h2>
                <div className="addButton" ><TbPlus /></div>
            </div>

            <div className="sidebarCategoryItems">
                {children}
            </div>
        </div>
    )

}

function CategoryItem({trip}) {

    let navigator = useNavigate();
    let userData = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')) : {};

    return (
        <div className="sidebarCategoryItem" onClick={() => navigator('./trip/' + trip._id)}>

            <div className="sidebarCategoryItemIcon"> </div>

            <div>
                <h4>{trip.name}</h4>
                <h5>{dateFormat(trip.date, "dS mmmm yyyy")}</h5>
            </div>

            <div className="sidebarCategoryItemDeleteIcon">
                <h2>{trip.owner === userData._id ? <TbTrashX /> : <></>}</h2>
            </div>

        </div>
    )
}
