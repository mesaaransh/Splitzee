import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import generateDebtMatrix from "./functions/debtMatrix";
import { DebtMatrix } from "../../../schemas/debtMatrix";

export default function Totals({ display, setDisplay, trip }: any) {

    function closeHandle() { setDisplay(false) }
    let [matrix, setMatrix] = useState<DebtMatrix>();

    useEffect(() => {
        console.log(generateDebtMatrix(trip))
        setMatrix(generateDebtMatrix(trip))
    }, [trip, display])

    return (
        <>
            <div className="popupblur" style={{ display: display ? 'flex' : 'none' }}></div>
            <div className="formContainer" style={{ display: display ? 'flex' : 'none' }}>
                <div className="totals">

                    <h2>Trip Totals</h2>
                    <p>{trip.name}</p>

                    <table className="totalsTable">
                        <thead>
                            <tr>
                                <th className=""></th> {/* Empty top-left */}
                                {matrix?.columns.map((colName, idx) => (
                                    <th key={idx} className="totalCell">
                                        {colName}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {matrix?.rows.map((rowName, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td className="totalCell">{rowName}</td>
                                    {matrix?.columns.map((_, colIndex) => (
                                        <td key={colIndex} className="totalCell">
                                            {matrix?.matrix[rowIndex][colIndex] !== 0
                                                ? matrix?.matrix[rowIndex][colIndex].toFixed(2)
                                                : '0'}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="closeButton" onClick={closeHandle}>
                        <FaXmark />
                    </div>

                </div>
            </div>
        </>
    )
}
