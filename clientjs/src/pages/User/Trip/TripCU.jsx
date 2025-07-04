import { TbArrowBigUpLine, TbPlus, TbCash, TbUsersPlus } from "react-icons/tb";

export function TripCu() {

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

                    <div className="tripAction actionblue">
                        <div className="tripButton"><TbPlus /></div>
                        Add an expense
                    </div>

                    <div className="tripAction actionred">
                        <div className="tripButton"><TbCash /></div>
                        See totals
                    </div>

                    <div className="tripAction actiongreen">
                        <div className="tripButton"><TbUsersPlus /></div>
                        Invite a friend
                    </div>

                </div>
            </div>
        </>
    );

}
