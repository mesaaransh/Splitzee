import "./Trip.css"
import AddExpense from "../Forms/AddExpense";
import { TbTrashX } from "react-icons/tb";
import { TbBookmark } from "react-icons/tb";
import { TbUsersPlus } from "react-icons/tb";
import { TbArrowBigUpLine } from "react-icons/tb";
import { TbCash } from "react-icons/tb";
import { TbPlus } from "react-icons/tb"
import { useEffect, useState } from "react";
import AddFriend from "../Forms/AddFriend";
import axios from "axios";
import config from "../../../config";

import dateFormat from "dateformat";

let token = sessionStorage.getItem('token')

export default function Trip() {
    
    let id = window.location.pathname.split('/')[3];
    let [addExpense, setAddExpense] = useState(false);
    let [addFriend, setAddFriend] = useState(false);

    let [sectionData, setSectionData] = useState([]);
    let [tData, setTData]= useState([]);

    let[data, setData] = useState({
        _id: '',
        members: []
    })

    useEffect(() => {Fetcher()}, [id, data]);
    async function Fetcher(){
        axios.get(config.apiURL + 'trip/' + id, {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'token': token
            }
        }).catch((err) => {
            console.log(err);
        }).then((resp: any) => {

            if(resp && resp.status == 200){

                let transactions: any = [];
                let sectionData: any = [];
                let tData: any = [];

                setData(resp.data);
                transactions = resp.data.transactions
                transactions = Object.groupBy(transactions, ({date}: any) => date);

                transactions = Object.keys(transactions).sort().reduce(
                    (obj: any, key) => { 
                      obj[key] = transactions[key]; 
                      return obj;
                    }, 
                    {}
                );

                for(let key in transactions){
                    sectionData.push({date: key, count: transactions[key].length})
                    tData.push(transactions[key])
                }

                setSectionData(sectionData);
                setTData(tData);
                
                console.log(tData);
            }
        })
    }


    return (
        <>
        <AddExpense display = {addExpense} setDisplay={setAddExpense} data={data} setData={setData}/>
        <AddFriend display= {addFriend} setDisplay={setAddFriend} tripId={data._id} members={data.members} setData={setData}/>

        <div className="trip">
            <TripCu expense={setAddExpense} friend={setAddFriend} />

            <div className="tripTransactions">

                {
                    sectionData.map((item: any, index: number) => (
                        <TripTransactionSection date={item.date} num={item.count}>

                        {
                            tData[index].map((trans: any) => (
                                <TripTransaction head={trans.description} date={trans.date} amount={trans.amount} />
                            ))
                        }

                        </TripTransactionSection>
                    ))
                }
            </div>

        </div>
        </>
    )
}



function TripTransactionSection({ date, num, children }: any) {

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


function TripTransaction({ head, date, amount }: any) {

    return (

        <div className="tripTransaction">
            <div className="tripTransactionIcon"></div>
            <div>
                <h3>{head}</h3>
                <h4 className="tripTransactionDate">{dateFormat(date, 'mmmm dd yyyy')}</h4>
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


function TripCu({expense, friend} :any) {
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

                <div className="tripAction actiongreen" onClick={() => {friend(true)}}>
                    <div className="tripButton"><TbUsersPlus /></div>
                    Invite a friend
                </div>

            </div>
        </div>
        </>
    )

}