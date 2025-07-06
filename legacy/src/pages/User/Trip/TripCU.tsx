import { TbArrowBigUpLine, TbPlus, TbCash, TbUsersPlus } from "react-icons/tb";
import { useEffect, useState } from "react";
import { MemberFlow } from "../../../schemas/memberflows";
import { useOutletContext } from "react-router-dom";
import CurrUserFlows from "./functions/flowCalc";


export function TripCu({ expense, friend, total, trip }: any) {

    let [flows, setFlows] = useState<MemberFlow[]>([])
    let [userData, _]: any = useOutletContext();

    useEffect(() => {
        setFlows(CurrUserFlows(trip, userData.id))
    }, [trip])

    function formatName(fullName: string): string {
        const [firstName, lastName] = fullName.trim().split(" ");
        if (!firstName) return "";

        return lastName
            ? `${firstName[0]}. ${lastName}`
            : firstName;
    }

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

                        {
                            flows.map((m: MemberFlow) => (
                                <tr>
                                    <td>{formatName(m.name)}</td>
                                    <td className="inflow data">{m.inflow}</td>
                                    <td className="outflow data">{m.outflow}</td>
                                    {
                                        <td className={m.outflow - m.inflow < 0?'inflow data':'outflow data'}>{m.outflow - m.inflow}</td>
                                    }
                                </tr>
                            ))
                        }

                    </table>
                </div>

                <div className="tripActions">

                    <div className="tripAction actionyellow">
                        <div className="tripButton"><TbArrowBigUpLine /></div>
                        Export trip
                    </div>

                    <div className="tripAction actionblue" onClick={() => { expense(true); }}>
                        <div className="tripButton"><TbPlus /></div>
                        Add an expense
                    </div>

                    <div className="tripAction actionred" onClick={() => { total(true); }}>
                        <div className="tripButton"><TbCash /></div>
                        See totals
                    </div>

                    <div className="tripAction actiongreen" onClick={() => { friend(true); }}>
                        <div className="tripButton"><TbUsersPlus /></div>
                        Invite a friend
                    </div>

                </div>
            </div>
        </>
    );

}
