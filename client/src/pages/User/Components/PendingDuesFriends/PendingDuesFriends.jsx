import "./PendingDuesFriends.css"

export default function PendingDuesFriends() {

    let userData = JSON.parse(sessionStorage.getItem('userData'))

    return (
        <div className="pendingDuesFriends">
            <h3>My Friends</h3>

            <div className="friends">
                {
                    userData.friends.map((friend) => (
                        <Friend friend={friend} />
                    ))
                }
            </div>

        </div>
    )
}


function Friend({friend}) {

    return (
        <div className="friend">
            <div className="friendimg">
                <img src={friend.profilePhoto} alt="" />
            </div>
            <div>
                <h4>{friend.name}</h4>
                <p>{friend.email}</p>
            </div>
        </div>
    )

}
