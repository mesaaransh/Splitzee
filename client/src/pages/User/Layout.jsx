import { Outlet, useNavigate } from "react-router-dom"
import "./Layout.css"
import Sidebar from "./Sidebar/Sidebar"
import Topbar from "./Topbar/Topbar"
import authenticator from "./authenticator"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export default function Layout() {
  
  let navigator = useNavigate();

  let auth = useQuery({
    queryKey: ['auth'],
    queryFn: authenticator,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  })

  return (
    auth.data?
    <div className="main">
      <div className="mainContent">
        <Topbar />
        <div className="content">
          <Outlet />
        </div>
      </div>
      <Sidebar />
    </div>
    :
    <></>
  )
}
