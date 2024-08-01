import axios from "axios";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import config from "../../../config";


export default function AddFriend({display, setDisplay, tripId, members, setData}: any) {
    
    let [friends, setFriends] = useState([])

    function closeHandle() {
        setDisplay(false);
    }

    useEffect(() => {Fetcher()}, []);
    async function Fetcher(){
        let token = sessionStorage.getItem('token')
        
        axios.get(config.apiURL + 'friends', {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'token': token
            }
        }).catch((err) => {
            console.log(err);
        }).then((resp: any) => {
            setFriends(resp.data.friends)
            console.log(resp.data.friends);
            
        })
    }

    function friendChecker(id: any){
        for(let i = 0; i < members.length; i++){
            if(members[i]._id == id){
                return true;
            }
        }
        return false;
    }

    return (
        <>
            <div className="popupblur" style={{ display: display ? 'flex' : 'none' }}></div>
            <div className="popupFrom" style={{ display: display ? 'flex' : 'none' }}>
                <h2>Invite Friends</h2>

                <div className="friendList">
                    {friends.map((friend: any) => {
                        let fri = friendChecker(friend._id)
                        return(
                            <Friend data={friend} tripId = {tripId} fri={fri} setData = {setData} />
                        )
                    } )}
                </div>

                <div className="closeButton" onClick={closeHandle}>
                    <FaXmark />
                </div>
            </div>
        </>
    )
}


function Friend({data, tripId, fri, setData}: any){

    function addHandler(){
        let token = sessionStorage.getItem('token')
        axios.post(config.apiURL + 'member', {
            tripId: tripId,
            friendId: data._id
        },{
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'token': token
            }
        }).catch((err) => {
            console.log(err);  
        }).then((resp) => {
            if(resp && resp.status == 200){
                setData(resp.data)
            }
            console.log(resp);
        })

    }
    

    return(
        <div className="friendListFriend">
            <div>
                <h4>{data.name}</h4>
                <p>{data.email}</p>
            </div>
            {!fri?<button className="pop" onClick={addHandler}>Add to trip</button>:<button disabled>In the trip</button>}
        </div>

    )

}