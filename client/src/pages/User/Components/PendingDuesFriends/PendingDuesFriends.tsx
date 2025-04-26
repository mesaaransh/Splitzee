import "./PendingDuesFriends.css"

export default function PendingDuesFriends() {
    return (
        <div className="pendingDuesFriends">
            <h3>Pending Dues</h3>

            <div className="friends">
                <Friend name={"Chirag Bansal"} amount={'XXXX'} />
                <Friend name={"Nandan Garg"} amount={'XXXX'} />
                <Friend name={"Abhay Bagla"} amount={'XXXX'} />
                <Friend name={"Vivek Arora"} amount={'XXXX'} />
            </div>

        </div>
    )
}


function Friend({name, amount}: any) {

    return (
        <div className="friend">
            <div className="friendimg"></div>
            <div>
                <h5>{name}</h5>
                <p>${amount}</p>
            </div>
        </div>
    )

}
