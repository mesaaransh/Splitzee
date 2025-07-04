import axios from "axios";
import config from "../../../config";
import { FaXmark } from "react-icons/fa6";
import { User } from "../../../schemas/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FriendSchema from "../../../schemas/friend";
import { useState } from "react";


export default function AddFriend({ display, setDisplay, trip }: any) {

    function closeHandle() {
        setDisplay(false);
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ['Friends'],
        queryFn: (): Promise<User> => (
            axios.get<User>(config.apiURL + 'friends', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'token': sessionStorage.getItem('token')
                }
            }).then((data) => {
                return data.data
            })
        ),
        enabled: !!trip
    })

    function isFriendInTrip(friendId: string) {
        return trip.members.some((e: FriendSchema) => e._id == friendId)
    }

    return (
        <>
            <div className="popupblur" style={{ display: display ? 'flex' : 'none' }}></div>
            <div className="formContainer" style={{ display: display ? 'flex' : 'none' }}>
                <div className="popupFrom">
                    <h2>Invite Friends</h2>
                    <p>{trip.name}</p>
                    {
                        isLoading ?
                            <>Loading..</>
                            :
                            <div className="friendList">
                                {
                                    data?.friends?.map((friend) => {
                                        return (
                                            <Friend data={friend} tripId={trip._id} fri={isFriendInTrip(friend._id)} />
                                        )
                                    })
                                }
                            </div>
                    }
                    <div className="closeButton" onClick={closeHandle}>
                        <FaXmark />
                    </div>
                </div>
            </div>
        </>
    )
}


function Friend({ data, tripId, fri }: any) {

    let [suc, setSuc] = useState(false);

    let query = useQueryClient()
    let addFriend = useMutation({
        mutationKey: ['AddFriend', data._id],
        mutationFn: () => (
            axios.post(config.apiURL + 'member', {
                tripId: tripId,
                friendId: data._id
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'token': sessionStorage.getItem('token')
                }
            })
        ),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['Friends'] })
            setSuc(true)
        },
        onError: (err) => { console.log(err) }
    })

    function addHandler() {
        addFriend.mutate();
    }

    return (
        <div className="friendListFriend">
            <div>
                <h4>{data.name}</h4>
                <p>{data.email}</p>
            </div>
            {
                addFriend.isPending ?
                    <button disabled>Loading...</button>
                    :
                    fri || suc?<button disabled>In the trip</button>:<button className="pop" onClick={addHandler}>Add to trip</button>
            }
        </div>

    )

}