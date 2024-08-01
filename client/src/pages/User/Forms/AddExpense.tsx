import axios from "axios";
import { useEffect, useState } from "react";
import {FaXmark} from "react-icons/fa6"
import config from "../../../config";
import waiter from "../../../waiter";

export default function AddExpense({display, setDisplay, data: {members}, setData }: any) {

    let tripId = window.location.pathname.split('/')[3];
    let [mem, setMem]: any = useState([])
    let [formData, setFormData]: any = useState({
        tripId: tripId
    })

    function closeHandle(){
        setDisplay(false);
    }

    function inputHandle(e: any){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function selectHandle(e: any){
        let temp: Array<String> = [...mem];

        if(temp.includes(e.target.id)){
            temp.splice(temp.indexOf(e.target.id), 1);
        }
        else{
            temp.push(e.target.id);
        }
        setMem(temp);
        setFormData({
            ...formData,
            members: temp
        });
    }

    function finSelectHandle(e: any){

        setFormData({
            ...formData,
            financer: e.target.id
        })

    }

    async function submitHandle(e: any){
        e.preventDefault();

        let token = sessionStorage.getItem('token')
        axios.post(config.apiURL + 'expense', formData, {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'token': token
            }
        }).catch((err) => {
            console.log(err);
        }).then(async (resp) => {
            if(resp && resp.status == 200){
                await waiter(100)
                setData(resp.data)
                setDisplay(false);
            }
        })
    }

    // useEffect(() => {
    //     console.log(formData);
    // }, [mem])

  return (
    <>
    <div className="popupFrom" style={{display: display?'flex':'none'}}>
        <h2>Expense Details</h2>

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
                    <input type="date" name="date" id="date" onInput={inputHandle} required />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" name="amount" id="amount" onInput={inputHandle} required />
                </div>
            </div>

            <h4>Payed By</h4>
            <div className="expenseFriends">
                {
                    members.map((member: any) => (
                        <p className={formData.financer == member._id?"selected":""} id={member._id} onClick={finSelectHandle}>{member.name}</p>
                    ))
                }
            </div>

            <h4>Shared By</h4>
            <div className="expenseFriends">
                {
                    members.map((member: any) => (
                        <p className={mem.includes(member._id)?"selected":""} id={member._id} onClick={selectHandle}>{member.name}</p>
                    ))
                }
            </div>

            <button type="submit">Save Details</button>
        </form>

        <div className="closeButton" onClick={closeHandle}>
            <FaXmark/>
        </div>
    </div>
    <div className="popupblur" style={{display: display?'flex':'none'}}></div>
    </>
  )
}
