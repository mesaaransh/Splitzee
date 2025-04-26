import { useEffect, useState } from "react";
import "./Friends.css"
import axios from "axios";
import config from "../../../config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../../../schemas/user";

let token = sessionStorage.getItem('token')

export default function Friends() {

  let {data, isLoading, error} = useQuery<User>({
    queryKey: ['FriendReq'],
    queryFn: async () => (
      await axios.get(config.apiURL + 'friends', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'token': token
        }
      }).then(data => data.data)
    )
  })

  return (
    <>
      <AddFriend />
      <h2 className="userFriendsTag">Your Friends</h2>
      <div className="userFriends">
        {
          data?.friends?.length != 0 ?
            data?.friends?.map((friend: any, i) => (
              <Friend key={i} name={friend.name} message={'You owe'} amount={200} />
            )) 
            :
            <p>You Have no friends</p>
        }
      </div>

      <h2 className="userFriendsTag">Friend Requests</h2>
      <div className="userFriends">

        {
          data?.requests?.length != 0 ?
            data?.requests?.map((friend: any) => (
              <FriendReq name={friend.name} email={friend.email} id={friend._id} data={data} />
            ))
            :
            <p>You have no pending requests</p>
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

function FriendReq({ name, email, id }: any) {
  
  let[error, setError] = useState('')
  let query = useQueryClient();

  let decHandle = useMutation({
    mutationKey: ['RequestDecision', id],
    mutationFn: (mode: string) => (
      axios.get(config.apiURL + `friends/${id}?mode=${mode}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'token': token
        }
      }).then(data => data.data)
    ),
    onSuccess: () => {
      query.invalidateQueries({queryKey: ['Req', email]})
      query.invalidateQueries({queryKey: ['FriendReq']})
    }
  })

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

  let [email, setEmail] = useState('')
  let [err, setErr] = useState('')
  let [vaah, setVaah] = useState('')

  function inputHandler(e: any) {
    setEmail(e.target.value);
  }

  let request = useMutation({
    mutationKey: ['Req', email],
    mutationFn: async (email: string) => (
      await axios.post(config.apiURL + 'friends', { email }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'token': token
        }
      }).then(data => data.data)
    ),
    onSuccess: () => {
      setVaah('Request Sent');
    },
    onError: (err: string) => {
      setErr(err)
    }
  })
  async function submitHandle(e: any) {
    e.preventDefault()
    setErr('')
    setVaah('')
    request.mutate(email)
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