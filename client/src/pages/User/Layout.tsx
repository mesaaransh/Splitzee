import { Outlet, useNavigate } from "react-router-dom"
import "./Layout.css"
import Sidebar from "./Sidebar/Sidebar"
import Topbar from "./Topbar/Topbar"
import { useEffect, useState } from "react"
import axios from "axios"
import config from "../../config"
import waiter from "../../waiter"
import { User } from "../../schemas/user"

export default function Layout() {

  let [auth, setAuth] = useState(true);
  let [userData, setUserData] = useState<User>({
    name: '',
    email: '',
    phone: '',
    _id: '',
    friends: [],
    requests: []
  });


  let [activeTrip, setActiveTrip] = useState(null);
  let navigator = useNavigate();

  useEffect(() => { authenticator() }, [])

  async function authenticator() {

    await waiter(100)
    let token: any = ""
    token = sessionStorage.getItem('token');

    axios.post(config.apiURL + 'verify', { token }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).catch((err) => {
      console.log(err);
    }).then((resp: any) => {
      if (resp && resp.status == 200) {
        setAuth(true)
        setUserData(resp.data)
      }
      else {
        setAuth(false);
        navigator('/login')
      }
    })
  }

  return (
    <>
      {
        auth ?
          <>
            <div className="main">
              <div className="mainContent">
                <Topbar />
                <div className="content">
                  <Outlet context={[userData, activeTrip]} />
                </div>
              </div>
              <Sidebar userData={userData} setActiveTrip={setActiveTrip} activeTrip={activeTrip} />
            </div>
          </>
          :
          <></>
      }
    </>
  )
}
