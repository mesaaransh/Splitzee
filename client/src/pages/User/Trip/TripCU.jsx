import { TbArrowBigUpLine, TbPlus, TbCash, TbUsersPlus } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";

import AddExpense from "./actions/Expense/AddExpense";
import AddFriend from "./actions/Friends/AddFriend";
import userTotals from "./functions/userTotals";
import exportData from "./actions/Export/exportData";
import Totals from "./actions/Totals/Totals";

export function TripCu({trip}) {

    let expenseRef = useRef();
    let friendRef = useRef();
    let totalRef = useRef();

    let [totals, setTotals] = useState(userTotals(trip))
    let data = exportData(trip.transactions)

    useEffect(() => {
        setTotals(userTotals(trip));
    }, [trip])

    return (
        <>  
            <div className="tripcu">

                <div className="tripInfo">
                    <h3>Trip Dues</h3>

                    <div className="tripInfoTotal">
                        {
                            totals.map((member) => (
                                <div className="friend">
                                    <p>{member.name}</p>
                                    <p className={member.total<0?'inflow':'outflow'}>
                                        ${member.total}
                                    </p>
                                </div>
                            ))
                        }
                    </div>

                </div>

                <div className="tripActions">

                    <CSVLink filename={trip.name} data={data} target="_blank" className="tripAction actionyellow">
                        <div className="tripButton"><TbArrowBigUpLine /></div>
                        Export trip
                    </CSVLink>

                    <AddExpense ref={expenseRef}/>
                    <div className="tripAction actionblue" onClick={() => {expenseRef.current?.open()}}>
                        <div className="tripButton"><TbPlus /></div>
                        Add expense
                    </div>
                    
                    <Totals ref={totalRef}/>
                    <div className="tripAction actionred" onClick={() => {totalRef.current?.open()}}>
                        <div className="tripButton"><TbCash /></div>
                        Trip totals
                    </div>

                    <AddFriend ref={friendRef}/>
                    <div className="tripAction actiongreen" onClick={() => {friendRef.current?.open()}}>
                        <div className="tripButton"><TbUsersPlus /></div>
                        Invite friends
                    </div>

                </div>
            </div>
        </>
    );

}
