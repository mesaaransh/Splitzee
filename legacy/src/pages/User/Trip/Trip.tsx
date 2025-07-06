import "./Trip.css"
import { groupBy } from 'lodash'
import AddExpense from "../Forms/AddExpense";
import { TbTrashX } from "react-icons/tb";
import { TbBookmark } from "react-icons/tb";
import { useEffect, useState } from "react";
import AddFriend from "../Forms/AddFriend";
import axios from "axios";
import config from "../../../config";
import dateFormat from "dateformat";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TripCu } from "./TripCU";
import { Transaction } from "../../../schemas/transaction";
import { Trip } from "../../../schemas/trip";
import { useNavigate, useOutletContext } from "react-router-dom";
import Totals from "./Totals";


export default function Trips() {

    const navigator = useNavigate();
    let [_, id]: any = useOutletContext();
    if(id == null){return navigator('/user')}

    let [addExpense, setAddExpense] = useState(false);
    let [addFriend, setAddFriend] = useState(false);
    let [seeTotal, setSeeTotal] = useState(false);
    let [groupedData, setGroupedData]:any = useState([])

    const { data, isLoading, error } = useQuery({
        queryKey: ['transactions', id],
        queryFn: async (): Promise<Trip> => {

            let response = await axios.get<Trip>(`${config.apiURL}trip/${id}`, {
                headers: {
                    token: sessionStorage.getItem('token')
                }
            });

            let data = response.data;
            setGroupedData(groupBy(data.transactions, 'date'));
            return data;
        },
        enabled: !!id
    });

    groupBy(data?.transactions, 'date')

    if (isLoading) return <>Loading...</>

    return (
        <>
            <AddExpense display={addExpense} setDisplay={setAddExpense} trip={data} />
            <AddFriend display={addFriend} setDisplay={setAddFriend} trip={data}/>
            <Totals display={seeTotal} setDisplay={setSeeTotal} trip={data} />

            <div className="trip">

                <TripCu expense={setAddExpense} friend={setAddFriend} total={setSeeTotal} trip={data} />
                <div className="tripTransactions">
                {
                    Object.keys(groupedData).sort().map((key, i) => (
                        <TripTransactionSection key={i} date={key} num={groupedData[key].length}>
                            {groupedData[key].map((t: any, i: number) => (
                                <TripTransaction key={i} data={t} />
                            ))}
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


function TripTransaction(data: any) {

    let [_, id]: any = useOutletContext();
    
    data = data.data
    function delHandle(){
        deleteExpense.mutate()
    }

    let query = useQueryClient()

    let deleteExpense = useMutation({
        mutationKey: ['DeleteExpense', data._id],
        mutationFn: () => (
            axios.delete(config.apiURL + 'expense/' + data._id, {
                headers: {
                    token: sessionStorage.getItem('token')
                }
            })
        ),
        onSuccess: (data) => {
            console.log(data);
            query.invalidateQueries({queryKey: ['transactions', id]})

        },
        onError: (err) => {
            console.log(err);
        }
    })

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