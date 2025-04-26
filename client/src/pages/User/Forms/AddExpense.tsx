import axios from "axios";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6"
import config from "../../../config";
import { User } from "../../../schemas/user";
import { Transaction } from "../../../schemas/transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddExpense({ display, setDisplay, trip }: any) {

    const queryClient = useQueryClient();

    let [mem, setMem]: any = useState([])

    let initalState: Transaction = {
        date: "",
        description: '',
        amount: 0,
        members: [],
        financer: '',
        trip: trip.id
    }
    let [formData, setFormData] = useState<Transaction>(initalState)

    function closeHandle() {
        setDisplay(false);
    }

    function inputHandle(e: any) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function selectHandle(e: any) {
        let temp: Array<string> = [...mem];

        if (temp.includes(e.target.id)) {
            temp.splice(temp.indexOf(e.target.id), 1);
        }
        else {
            temp.push(e.target.id);
        }

        setMem(temp);
        setFormData({
            ...formData,
            members: temp
        });

    }

    function finSelectHandle(e: any) {
        setFormData({
            ...formData,
            financer: e.target.id
        })
    }


    let expense = useMutation<void, Error, Transaction>({
        mutationKey: ['addExpenses'],
        mutationFn: async (formData: Transaction) => (
            await axios.post(config.apiURL + 'expense', { ...formData, trip: trip._id }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'token': sessionStorage.getItem('token')
                }
            })
        ),
        onSuccess: () => {
            window.alert('Expense Added!');
            setFormData(initalState);
            mem = [];
            queryClient.invalidateQueries({ queryKey: ['transactions', trip._id] });
            setDisplay(false);
        },
        onError: (err) => {
            console.log(err);
        }
    })

    async function submitHandle(e: any) {
        e.preventDefault();
        expense.mutate(formData)
    }

    return (
        <>
            <div className="popupblur" style={{ display: display ? 'flex' : 'none' }}></div>
            <div className="formContainer" style={{ display: display ? 'flex' : 'none' }}>
                <div className="popupFrom">
                    <h2>Expense Details</h2>
                    <p>{formData.trip}</p>

                    <form className="form" onSubmit={submitHandle}>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="name">Description</label>
                                <input type="text" name="description" id="name" onInput={inputHandle} value={formData.description} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="date">Expense Date</label>
                                <input type="date" name="date" id="date" onInput={inputHandle} value={formData.date} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="amount">Amount</label>
                                <input type="number" name="amount" id="amount" onInput={inputHandle} value={formData.amount} required />
                            </div>
                        </div>

                        <h4>Payed By</h4>
                        <div className="expenseFriends">
                            {
                                trip.members.map((member: User) => (
                                    <p className={formData.financer == member._id ? "selected" : ""} id={member._id} onClick={finSelectHandle}>{member.name}</p>
                                ))
                            }
                        </div>

                        <h4>Shared By</h4>
                        <div className="expenseFriends">
                            {
                                trip.members.map((member: any) => (
                                    <p className={mem.some((e: any) => e == member._id) ? "selected" : ""} id={member._id} onClick={selectHandle}>{member.name}</p>
                                ))
                            }
                        </div>

                        <button type="submit">Save Details</button>
                    </form>

                    <div className="closeButton" onClick={closeHandle}>
                        <FaXmark />
                    </div>
                </div>
            </div>
        </>
    )
}
