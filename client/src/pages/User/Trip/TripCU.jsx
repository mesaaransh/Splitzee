import { TbArrowBigUpLine, TbPlus, TbCash, TbUsersPlus } from "react-icons/tb";
import AddExpense from "./actions/Expense/AddExpense";
import { useEffect, useRef, useState } from "react";
import AddFriend from "./actions/Friends/AddFriend";
import userTotals from "./functions/userTotals";

export function TripCu({trip}) {

    let expenseRef = useRef();
    let friendRef = useRef();

    let [totals, setTotals] = useState(userTotals(trip))

    useEffect(() => {
        setTotals(userTotals(trip));
    }, [trip])

    return (
        <>  
            <div className="tripcu">

                <div className="tripInfo">
                    <h3>Trip Totals</h3>

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

                    <div className="tripAction actionyellow">
                        <div className="tripButton"><TbArrowBigUpLine /></div>
                        Export trip
                    </div>

                    <AddExpense ref={expenseRef}/>
                    <div className="tripAction actionblue" onClick={() => {expenseRef.current?.open()}}>
                        <div className="tripButton"><TbPlus /></div>
                        Add expense
                    </div>

                    <div className="tripAction actionred">
                        <div className="tripButton"><TbCash /></div>
                        See totals
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
