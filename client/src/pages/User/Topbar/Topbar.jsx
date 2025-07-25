import { useNavigate } from "react-router-dom"
import "./Topbar.css"

export default function Topbar() {

  let navigator = useNavigate();

  return (
    <div className="topbar">
        {/* <div className="logo"></div> */}
        <h2>Splitzee</h2>

        <div className="topbarMenu">
            <div className="topbarMenuButton" onClick={() => {navigator('./home')}}>Home</div>
            <div className="topbarMenuButton" onClick={() => {navigator('./friends')}} >Friends</div>
            <div className="topbarMenuButton" onClick={() => {navigator('./profile')}}>Profile</div>
        </div>
    </div>
  )
}
