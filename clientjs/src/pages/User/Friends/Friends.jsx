import "./Friends.css"

export default function Friends() {

  return (
    <>
      <AddFriend />
      <h2 className="userFriendsTag">Your Friends</h2>
      <div className="userFriends">
        <Friend name="Saaransh" message="You owe" amount={100} />
      </div>

      <h2 className="userFriendsTag">Friend Requests</h2>
      <div className="userFriends">
        <FriendReq name="Saaransh" email=""/>
      </div>
    </>
  )
}

function Friend({ name, message, amount }) {

  return (
    <div className="userFriend">
      <div className="userFriendImage"></div>
      <h3>{name}</h3>

      <h3>{message} ${amount}</h3>
    </div>
  );
}

function FriendReq({ name, email, id }) {

  return (
    <div className="userFriend">
      <div className="userFriendImage"></div>
      <div>
        <h3>{name}</h3>
        <p>{email}</p>
      </div>

      <div className="buttons">
        <button className="accept pop" onClick={() => {decHandle.mutate('accept')}}>Accept</button>
        <button className="reject shake" onClick={() => {decHandle.mutate('reject')}}>Reject</button>
      </div>
      <p className="error">{error}</p>
    </div>
  );
}

function AddFriend() {

  return (
    <div className="addFriends">
      <h2>Catch up with your friends!</h2>
      <form>
        <input type="email" name="email" placeholder="Enter Email" required />
        <button type="submit">Send Invite!</button>
      </form>
      <p className="error"></p>
      <p className="vaah"></p>
    </div>
  )

}