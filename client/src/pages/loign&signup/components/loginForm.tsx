import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginForm() {

    let [formData, setFormData] = useState({})
    let [error, setError] = useState("error")
    const navigate = useNavigate()

    function formInputHandler(e: any){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setError("")
    }


    async function Fetcher(userData: any) {
    }

    async function formSubmitHandler(e: any){
        e.preventDefault()
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
