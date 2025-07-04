import PendingDuesFriends from "../Components/PendingDuesFriends/PendingDuesFriends"
import UserActivity from "../Components/UserActivity/UserActivity"
import Welcome1 from "../Components/Welcome1/Welcome1"
import "./Home.css"

export default function Home() {
  return (
    <div className="home">
        <Welcome1/>
        <div className="row">
            <PendingDuesFriends/>
            <UserActivity/>
        </div>
    </div>
  )
}
