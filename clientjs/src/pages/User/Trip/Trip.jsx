import "./Trip.css"
import AddExpense from "../Forms/AddExpense";
import { TbTrashX } from "react-icons/tb";
import AddFriend from "../Forms/AddFriend";
import dateFormat from "dateformat";
import { TripCu } from "./TripCU";
import Totals from "./Totals";


export default function Trips() {

    return (
        <>
            <AddExpense />
            <AddFriend />
            <Totals />

            <div className="trip">

                <TripCu/>
                <div className="tripTransactions">
                    {
                        <TripTransactionSection>
                            <TripTransaction />
                        </TripTransactionSection>
                    }
                </div>

            </div>
        </>
    )
}



function TripTransactionSection({ date, num, children }) {

    return (

        <div className="tripTransactionSection">
            <div className="tripTransactionSectionHeader">
                <h3>{dateFormat(date, 'mmmm dd, yyyy')}</h3>
                <div>
                    <p>No. of transactions: {num}</p>
                </div>
            </div>
            {children}
        </div>

    )

}


function TripTransaction(data) {

    return (

        <div className="tripTransaction">
            <div className="tripTransactionIcon"></div>
            <div>
                <h3>{data.description}</h3>
                <h4 className="tripTransactionDate">{dateFormat(data.date, 'mmmm dd yyyy')}</h4>
            </div>

            <h3 className="tripTransactionAmount">${data.amount}</h3>
            <div className="tripTransactionIcons">
                <div className="bookmark">
                    <TbBookmark />
                </div>
                <div className="delete" onClick={delHandle}>
                    <TbTrashX />
                </div>
            </div>
        </div>

    )

}