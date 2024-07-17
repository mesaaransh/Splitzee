import "./Friends.css"

export default function Friends() {
  return (
    <>
    <h2 className="userFriendsTag">Overall, You owe $200</h2>
    <div className="userFriends">
        <Friend name={'Saaransh Gupta'} message={'You owe'} amount={200} />
        <Friend name={'Saaransh Gupta'} message={'You owe'} amount={200} />
        <Friend name={'Saaransh Gupta'} message={'You owe'} amount={200} />
        <Friend name={'Saaransh Gupta'} message={'You owe'} amount={200} />
    </div>
    </>
  )
}


function Friend({name, message, amount}: any){

    return(
        <div className="userFriend">
            <div className="userFriendImage"></div>
            <h3>{name}</h3>

            <h3>{message} ${amount}</h3>
        </div>
    );
}
