import { useEffect, useState } from "react";
import config from "../../../config";
import "./Friends.css"
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useSessionStorage from "./sessionStorage";

export default function Friends() {

  let [userData, setUserData] = useSessionStorage('userData', {})

  return (
    <>
      <AddFriend />
      <h2 className="userFriendsTag">Your Friends</h2>
      <div className="userFriends">
        {
          userData.friends.length === 0 ?
          <p className="noFriends">You have no friends yet! Add some friends to see them here.</p>
          :
          userData.friends.map((friend) => (
            <Friend key={friend._id} photo={friend.profilePhoto} name={friend.name} message="You owe" amount={friend.amount} />
          ))
        }
      </div>

      <h2 className="userFriendsTag">Friend Requests</h2>
      <div className="userFriends">
        {
          userData.requests.length === 0 ?
          <p className="noFriends">You have no friend requests yet!</p>
          :
          userData.requests.map((friend) => (
            <FriendReq key={friend._id} photo={friend.profilePhoto} name={friend.name} email={friend.email} id={friend._id} setUser={setUserData} />
          ))
        }
      </div>
    </>
  )
}

function Friend({ name, message, photo, amount }) {

  return (
    <div className="userFriend">
      <div className="userFriendImage">
        <img src={photo} alt="" />
      </div>
      <h3>{name}</h3>
    </div>
  );
}

function FriendReq({ name, email, photo, id, setUser}) {

  let decHandle = useMutation({
    mutationFn: (mode) => {
      return axios.get(config.apiURL + 'friends/' + id, {
        headers: {
          token: sessionStorage.getItem('token')
        },
        params: {mode}
      })
    },
    onSuccess: (data) => {
      setUser(data.data);
    },
  })

  return (
    <div className="userFriend">
      <div className="userFriendImage">
        <img src={photo} alt="" />
      </div>
      <div>
        <h3>{name}</h3>
        <p>{email}</p>
      </div>

      <div className="buttons">
        <button className="accept pop" onClick={() => {decHandle.mutate('accept')}}>Accept</button>
        <button className="reject shake" onClick={() => {decHandle.mutate('reject')}}>Reject</button>
      </div>
      <p className="error">{}</p>
    </div>
  );
}

function AddFriend() {

  let [error, setError] = useState('');
  let [msg, setMsg] = useState('');

  let requester = useMutation({
    mutationFn: (email) => {
      return axios.post(config.apiURL + 'friends', { email }, {
        headers: {
          token: sessionStorage.getItem('token')
        }
      })
    },
    onSuccess: (data) => {
      setMsg("Request has been sent successfully!");
      setError('');
    },
    onError: (error) => {
      setError(error.response.data || "An error occurred while sending the request.");
      setMsg('');
    }
  })

  function requestHandle(e){
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let email = formData.get('email');
    requester.mutate(email);   
  }

  return (
    <div className="addFriends">
      <h2>Catch up with your friends!</h2>
      <form onSubmit={requestHandle}>
        <input type="email" name="email" placeholder="Enter Email" required />
        <button type="submit">Send Invite!</button>
      </form>
      <p className="error">{error}</p>
      <p className="vaah">{msg}</p>
    </div>
  )

}