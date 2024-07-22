import { useEffect, useState } from "react";
import "./Friends.css"
import axios from "axios";
import config from "../../../config";

let token = sessionStorage.getItem('token')

export default function Friends() {

  let [data, setData]: any = useState({
    friends: [],
    requests: []
  })

  useEffect(() => { Fetcher() }, [])
  async function Fetcher() {

    let token = sessionStorage.getItem('token')
    let resp = await axios.get(config.apiURL + 'friends', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': token
      }
    })
    setData(resp.data);
  }

  return (
    <>
      <AddFriend />
      <h2 className="userFriendsTag"> {data.friends.length != 0 ? "Your Friends" : ""} </h2>
      <div className="userFriends">
        {
          data.friends.length != 0 ?
            data.friends.map((friend: any) => (
              <Friend name={friend.name} message={'You owe'} amount={200} />
            )) :
            <></>
        }
      </div>

      <h2 className="userFriendsTag">{data.requests.length != 0? "Friend Requests": ""}</h2>
      <div className="userFriends">

        {
          data.requests.length != 0 ?
            data.requests.map((friend: any) => (
              <FriendReq name={friend.name} email={friend.email} id={friend._id} setData={setData} data={data} />
            ))
            :
            <></>
        }

      </div>
    </>
  )
}

function Friend({ name, message, amount }: any) {

  return (
    <div className="userFriend">
      <div className="userFriendImage"></div>
      <h3>{name}</h3>

      <h3>{message} ${amount}</h3>
    </div>
  );
}

function FriendReq({ name, email, id, setData }: any) {
  
  let[error, setError] = useState('')
  async function acceptHandle() {

    axios.get(config.apiURL + 'friends/' + id + '?mode=accept', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': token
      }
    }).catch((err) => {
      console.log(err);
      setError(err.response.data)
    }).then((resp: any) => {
      console.log(resp);
      setData(resp.data)
    })

  }
  async function rejectHandle() {


    axios.get(config.apiURL + 'friends/' + id + '?mode=reject', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': token
      }
    }).catch((err) => {
      console.log(err);
      setError(err.response.data)
    }).then((resp: any) => {
      console.log(resp);  
      setData(resp.data)
    })
  }

  return (
    <div className="userFriend">
      <div className="userFriendImage"></div>
      <div>
        <h3>{name}</h3>
        <p>{email}</p>
      </div>

      <div className="buttons">
        <button className="accept pop" onClick={acceptHandle}>Accept</button>
        <button className="reject shake" onClick={rejectHandle}>Reject</button>
      </div>
      <p className="error">{error}</p>
    </div>
  );
}

function AddFriend() {

  let [email, setEmail] = useState('')
  let [err, setErr] = useState('')
  let [vaah, setVaah] = useState('')

  function inputHandler(e: any) {
    setEmail(e.target.value);
  }

  async function submitHandle(e: any) {
    e.preventDefault()
    setErr('')
    setVaah('')

    axios.post(config.apiURL + 'friends', { email }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': token
      }
    }).catch((err) => {
      console.log(err);
      setErr(err.response.data)
    }).then((resp) => {
      console.log(resp);
      if(resp && resp.status == 200){
        setVaah('Request Sent');
        e.target.value = "";
      }
    })

  }

  return (
    <div className="addFriends">
      <h2>Catch up with your friends!</h2>
      <form onSubmit={submitHandle}>
        <input type="email" name="email" placeholder="Enter Email" required onInput={inputHandler} />
        <button type="submit">Send Invite!</button>
      </form>
      <p className="error">{err}</p>
      <p className="vaah">{vaah}</p>
    </div>
  )

}