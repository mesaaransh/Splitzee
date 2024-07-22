import { Outlet, useNavigate } from "react-router-dom"
import "./Layout.css"
import Sidebar from "./Sidebar/Sidebar"
import Topbar from "./Topbar/Topbar"
import { useEffect, useState } from "react"
import axios from "axios"
import config from "../../config"

export default function Layout() {
  let [auth, setAuth] = useState(false);
  let [name, setName] = useState("");

  let navigator = useNavigate();

  useEffect(() => { authenticator() }, [])
  async function authenticator() {

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
        setName(resp.data.name)
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
                  <Outlet />
                </div>
              </div>
              <Sidebar name={name} />
            </div>
          </>
          :
          <></>
      }
    </>
  )
}
