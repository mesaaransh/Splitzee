import { useQueryClient } from '@tanstack/react-query';
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { FaXmark } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import tripTotals from '../../functions/tripTotals';
import dateFormat from "dateformat";

const Totals = forwardRef((props, ref) => {

    const [open, setOpen] = useState(false);
    let query = useQueryClient();

    useImperativeHandle(ref, () => ({
        open: () => setOpen(true),
        close: () => setOpen(false)
    }));

    function closeForm() {
        setOpen(false);
    }

    const { id } = useParams()
    const trip = query.getQueryData(['trip', id])

    let totals = tripTotals(trip.grouped);
    const tripTotal = totals.reduce((sum, txn) => sum + (txn.total || 0), 0)

    if (!open) return <></>;
    return (
        <div className="formContainer">
            <form action="">
                <div>
                    <h2>Trip Totals</h2>
                    <p>{trip.raw.name}</p>
                </div>
                <div className="closeForm">
                    <FaXmark onClick={closeForm} />
                </div>

                <div className="totalTable">
                    {
                        totals.map((day) => (
                            <TotalTableHead day={day} />
                        ))
                    }
                    <div className="totalTableHead">
                        <strong>Total</strong>
                        <strong>$ {tripTotal}</strong>
                    </div>
                </div>
            </form>
        </div>
    )
})

function TotalTableHead({ children, day }) {

    return (
        <>
            <div className="totalTableHead">
                <strong>{dateFormat(day.date, 'dd mmmm yy')}</strong>
                <strong>$ {day.total}</strong>
            </div>
            <div className="totalTableTxs">
                {
                    day.subTransactions.map((tx) => (
                        <>
                        <TotalTableTx tx={tx} />
                        </>
                    ))
                }
            </div>
        </>
    )

}

function TotalTableTx({ tx }) {
    return (
        <div className="totalTableTx">
            <p>{tx.description}</p>
            <p>$ {tx.amount}</p>
        </div>
    )
}

export default Totals
