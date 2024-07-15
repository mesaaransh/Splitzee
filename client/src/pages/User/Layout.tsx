import { Outlet } from "react-router-dom"
import "./Layout.css"
import Sidebar from "./Sidebar/Sidebar"
import Topbar from "./Topbar/Topbar"

export default function Layout() {
  return (
    <div className="main">
        <div className="mainContent">
          <Topbar/>
          <div className="content">
            <Outlet/>
          </div>
        </div>
        <Sidebar/>
    </div>
  )
}
