import "./Trip.css"
import AddExpense from "../Forms/AddExpense";
import { TbTrashX } from "react-icons/tb";
import { TbBookmark } from "react-icons/tb";
import { TbUsersPlus } from "react-icons/tb";
import { TbArrowBigUpLine } from "react-icons/tb";
import { TbCash } from "react-icons/tb";
import { TbPlus } from "react-icons/tb"
import { useState } from "react";

export default function Trip() {

    let [addExpense, setAddExpense] = useState(false);
    return (
        <>
        <AddExpense display = {addExpense} setDisplay={setAddExpense}/>

        <div className="trip">
            <TripCu expense={setAddExpense} />

            <div className="tripTransactions">

                <TripTransactionSection date={'Feburary 31, 2023'} num={'04'} val={'1234'}>
                    <TripTransaction head={'Phalana Dhimkana'} date={'Feburary 31 2023'} amount={123} />
                    <TripTransaction head={'Phalana Dhimkana'} date={'Feburary 31 2023'} amount={123} />
                    <TripTransaction head={'Phalana Dhimkana'} date={'Feburary 31 2023'} amount={123} />
                    <TripTransaction head={'Phalana Dhimkana'} date={'Feburary 31 2023'} amount={123} />
                    <TripTransaction head={'Phalana Dhimkana'} date={'Feburary 31 2023'} amount={123} />
                    <TripTransaction head={'Phalana Dhimkana'} date={'Feburary 31 2023'} amount={123} />
                </TripTransactionSection>

                <TripTransactionSection date={'Feburary 31 2023'} num={'04'} val={'1234'}>
                    <TripTransaction head={'Phalana Dhimkana'} date={'Feburary 31 2023'} amount={123} />
                    <TripTransaction head={'Phalana Dhimkana'} date={'Feburary 31 2023'} amount={123} />
                    <TripTransaction head={'Phalana Dhimkana'} date={'Feburary 31 2023'} amount={123} />
                    <TripTransaction head={'Phalana Dhimkana'} date={'Feburary 31 2023'} amount={123} />
                    <TripTransaction head={'Phalana Dhimkana'} date={'Feburary 31 2023'} amount={123} />
                    <TripTransaction head={'Phalana Dhimkana'} date={'Feburary 31 2023'} amount={123} />
                </TripTransactionSection>

            </div>

        </div>
        </>
    )
}



function TripTransactionSection({ date, num, val, children }: any) {

    return (

        <div className="tripTransactionSection">
            <div className="tripTransactionSectionHeader">
                <h3>{date}</h3>
                <div>
                    <p>No. of transactions: {num}</p>
                    <p>Value: {`$${val}`}</p>
                </div>
            </div>

            {children}
        </div>

    )

}


function TripTransaction({ head, date, amount }: any) {

    return (

        <div className="tripTransaction">
            <div className="tripTransactionIcon"></div>
            <div>
                <h3>{head}</h3>
                <h4 className="tripTransactionDate">{date}</h4>
            </div>

            <h3 className="tripTransactionAmount">${amount}</h3>
            <div className="tripTransactionIcons">
                <div className="bookmark">
                    <TbBookmark />
                </div>
                <div className="delete">
                    <TbTrashX />
                </div>
            </div>
        </div>

    )

}


function TripCu({expense} :any) {
    return (
        <>
        <div className="tripcu">
            
            <div className="tripInfo">
                <h4>Overall, You owe $10000</h4>
                <p>Chirag B. owes you $200</p>
                <p>You owe Chirag B. $200</p>
                <p>Chirag B. owes you $200</p>
                <p>Chirag B. owes you $200</p>
            </div>

            <div className="tripActions">

                <div className="tripAction actionyellow">
                    <div className="tripButton"><TbArrowBigUpLine /></div>
                    Export trip
                </div>

                <div className="tripAction actionblue" onClick={() => {expense(true)}}>
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
    )

}