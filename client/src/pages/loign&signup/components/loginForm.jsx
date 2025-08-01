import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import config from "../../../config"

export default function LoginForm() {

    let [formData, setFormData] = useState({})
    let [err, setErr] = useState("")
    const navigator = useNavigate()

    function formInputHandler(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const login = useMutation({
        mutationKey: ['login'],
        mutationFn: (formData) =>
            axios.post(config.apiURL + 'login', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((data) => (data.data)),
        onSuccess: (resp) => {
            sessionStorage.setItem('token', resp.token);
            sessionStorage.setItem('userData', JSON.stringify(resp.userData));
            navigator('/user/home', { replace: true })
        },
        onError: (err)=>{
            console.log(err.response.data);
            setErr(err.response.data)
        }
    })

    async function formSubmitHandler(e) {
        e.preventDefault()
        login.mutate(formData);
    }

    return (
        <form className="signupForm" onSubmit={formSubmitHandler}>

            <div className="formRow">
                <div className="formControl">
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" onInput={formInputHandler} />
                </div>
            </div>

            <div className="formRow">
                <div className="formControl">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" onInput={formInputHandler} />
                </div>
            </div>

            <div className="formFooter">
                <div className="rm">
                    <input type="checkbox" />
                    <label htmlFor="">Remember Me?</label>
                </div>

                <label htmlFor="">Frogot Password?</label>
            </div>

            <p className="error">{err}</p>
            <button type="submit" disabled={login.isPending}>{login.isPending?'Loggin In':'Login'}</button>

        </form>
    )
}
