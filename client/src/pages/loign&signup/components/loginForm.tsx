import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import config from "../../../config"
import waiter from "../../../waiter"

export default function LoginForm() {

    let [formData, setFormData] = useState({})
    let [error, setError] = useState("")
    const navigator = useNavigate()

    function formInputHandler(e: any){
        setError("")
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function formSubmitHandler(e: any){
        e.preventDefault()

        axios.post(config.apiURL + 'login', formData, {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).catch((err) => {
            setError(err.response.data)
            console.log(err)
        }).then(async (response: any) => {
            if(response.status == 200){
                sessionStorage.setItem('token', response.data)
                await waiter(1000)
                navigator('/user/home')
            }
        })

    }


    

    return (
        <form className="signupForm" onSubmit={formSubmitHandler}>
            
            <div className="formRow">
                <div className="formControl">
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" onInput={formInputHandler}/>
                </div>
            </div>
            <div className="formRow">
                <div className="formControl">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" onInput={formInputHandler}/>
                </div>
            </div>

            <div className="formFooter">
                <div>
                    <input type="checkbox" />
                    <label htmlFor="">Remember Me?</label>
                </div>

                <label htmlFor="">Frogot Password?</label>
            </div>

            <p className="error">{error}</p>
            <button type="submit">Login</button>

        </form>
    )
}
