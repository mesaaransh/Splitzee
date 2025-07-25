import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forwardRef, useImperativeHandle, useState } from "react"
import { useParams } from "react-router-dom"
import { FaXmark } from "react-icons/fa6";
import inviter from "./friendInviter";

let AddFriend = forwardRef((props, ref) => {

   let userData = JSON.parse(sessionStorage.getItem('userData'))
   const [open, setOpen] = useState(false);

   let { id } = useParams();
   const query = useQueryClient()
   const trip = query.getQueryData(['trip', id])

   useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false)
   }));

   function closeForm() {
      setOpen(false);
   }

   if (!open) return null;
   return (
      <div className="formContainer">
         <form>
            <div>
               <h2>Invite Friends</h2>
               <p>{trip.raw.name}</p>
            </div>
            <div className="closeForm">
               <FaXmark onClick={closeForm} />
            </div>
            <div className="formGroup">
               {
                  userData.friends.map((friend) => (
                     <Friend key={friend._id} friend={friend} />
                  ))
               }
            </div>
         </form>
      </div>
   )
})

function Friend({ friend }) {

   let { id } = useParams();
   const query = useQueryClient()
   const trip = query.getQueryData(['trip', id]).raw

   let friendInvite = useMutation({
      mutationFn: (d) => inviter(d),
      onSuccess: () => {
         alert('Invite Successful');
         setIsPresent(true);
         query.invalidateQueries(['trip', id])
      },
      onError: (err) => {
         alert('There was an Error');
         console.log(err);
      }
   })

   function addHandle(friendId, e) {
      e.preventDefault()
      friendInvite.mutate({
         friendId: friendId,
         tripId: id
      })
   }

   const [isPresent, setIsPresent] = useState(trip.members.some((m) => m._id === friend._id));

   return (
      <div className="friendInvite">
         <div>
            <p>{friend.name}</p>
            <p>{friend.email}</p>
         </div>
         <button onClick={(e) => addHandle(friend._id, e)}>
            {isPresent ? 'In the trip' : 'Invite'}
         </button>
      </div>
   )
}

export default AddFriend