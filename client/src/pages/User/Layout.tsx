import { Outlet } from "react-router-dom"
import "./Layout.css"
import Sidebar from "./Sidebar/Sidebar"
import Topbar from "./Topbar/Topbar"
import AddTrip from "./Forms/AddTrip"
import { useState } from "react"

export default function Layout() {
  let [add, setAdd] = useState(false);

  return (
    <>
    <AddTrip display = {add} setDisplay = {setAdd}/>
    <div className="main" style={{filter: `blur(${blur}px)`}}>
        <div className="mainContent">
          <Topbar/>
          <div className="content">
            <Outlet/>
          </div>
        </div>
        <Sidebar setAdd={setAdd}/>
    </div>
    </>
  )
}
