import axios from "axios";
import { useState } from "react"
import config from "../../../config";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import waiter from "../../../waiter";

export default function SignupForm() {

    let [formData, setFromData] = useState({
        password: ""
    });

    let [error, setError] = useState("")
    let [disable, setDisable] = useState(true)
    let [alert, setAlert] = useState("none");
    const navigator = useNavigate();

    function formInputHandler(event: any) {
        setError("")
        let name = event.target.name;
        let value = event.target.value;
        setFromData({
            ...formData,
            [name]: value
        });
    }

    const signup = useMutation({
        mutationKey: ['signup'],
        mutationFn: (formData: any) =>
            axios.post(config.apiURL + 'user', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((data) => (data.data)),
        onSuccess: async () => {
            window.alert('Login Successful')
            await waiter(1000);
            navigator('/login');
        },
        onError: (err)=>{
            setError(err.message)
            console.log(err);
        }
    })

    async function submitHandler(e: any) {
        e.preventDefault();
        signup.mutate(formData)
    }

    function validatePassword(e: any) {
        if (e.target.value == formData.password) {
            setError("")
            setDisable(false)
        }
        else {
            setError("Passwords don't match")
            setDisable(true)
        }
    }


    return (
        <>
            <form className="signupForm" onSubmit={submitHandler}>

                <div className="formRow">
                    <div className="formControl">
                        <label htmlFor="">Name</label>
                        <input type="text" name="name" onInput={formInputHandler} required />
                    </div>
                </div>

                <div className="formRow">
                    <div className="formControl">
                        <label htmlFor="">Phone Number</label>
                        <input type="number" pattern={"[0-9]{10}"} name="phone" onInput={formInputHandler} required />
                    </div>
                </div>

                <div className="formRow">
                    <div className="formControl">
                        <label htmlFor="">Email</label>
                        <input type="email" name="email" onInput={formInputHandler} required />
                    </div>
                </div>

                <div className="formRow">
                    <div className="formControl">
                        <label htmlFor="">Password</label>
                        <input type="password" name="password" onInput={formInputHandler} required />
                    </div>
                </div>

                <div className="formRow">
                    <div className="formControl">
                        <label htmlFor="">Confirrm Password</label>
                        <input type="password" onChange={validatePassword} required />
                    </div>
                </div>

                <div className="formFooter">
                    <div className="rm">
                        <input type="checkbox" />
                        <label> Remember Me? </label>
                    </div>

                    <label htmlFor=""> Frogot Password? </label>
                </div>

                <p className="error">{error}</p>
                <button type="submit" disabled={disable}>{signup.isPending?'Setting Up Everything':'Sign Up'}</button>

            </form>
        </>
    )
}
