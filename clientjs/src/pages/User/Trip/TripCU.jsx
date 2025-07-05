import { TbArrowBigUpLine, TbPlus, TbCash, TbUsersPlus } from "react-icons/tb";
import AddExpense from "./actions/AddExpense";
import { useRef } from "react";

export function TripCu() {

    let expenseRef = useRef();

    return (
        <>  
            <div className="tripcu">

                <div className="tripInfo">
                    <table className="tripInfoTable">
                        <thead>
                            <td></td>
                            <td>Owed</td>
                            <td>Lent</td>
                            <td>Total</td>
                        </thead>

                        {/* {
                            flows.map((m) => (
                                <tr>
                                    <td>{formatName(m.name)}</td>
                                    <td className="inflow data">{m.inflow}</td>
                                    <td className="outflow data">{m.outflow}</td>
                                    {
                                        <td className={m.outflow - m.inflow < 0?'inflow data':'outflow data'}>{m.outflow - m.inflow}</td>
                                    }
                                </tr>
                            ))
                        } */}

                    </table>
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

                    <div className="tripAction actiongreen">
                        <div className="tripButton"><TbUsersPlus /></div>
                        Invite friends
                    </div>

                </div>
            </div>
        </>
    );

}
