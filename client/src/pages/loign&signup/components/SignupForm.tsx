import { useState } from "react"

export default function SignupForm() {

    let [formData, setFromData] = useState({
        password: ""
    });
    let [error, setError] = useState("")
    let [disable, setDisable] = useState(true)

    let [alert, setAlert] = useState("none");

    function formInputHandler(event: any){
        setError("")
        let name = event.target.name;
        let value = event.target.value;
        setFromData({
            ...formData,
            [name]: value
        });
    }


    async function submitHandler(e: any){
        e.preventDefault();
    }

    function validatePassword(e: any){

        if(e.target.value == formData.password){
            setError("")
            setDisable(false)
        }
        else{
            setError("Passwords don't match")
            setDisable(true)
        }

    }


    return (
        <>
        <div className="signupSuccess" style={{display: alert}}>
            <div>
                <h1>Sign Up Successfull!</h1>
                <p>Welcome to our family.</p>
            </div>
        </div>
        <form className="signupForm" onSubmit={submitHandler}>

            <div className="formRow">
                <div className="formControl">
                    <label htmlFor="">Name</label>
                    <input type="text" name="name" onInput={formInputHandler} required/>
                </div>
            </div>

            <div className="formRow">
                <div className="formControl">            
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" onInput={formInputHandler} required/>
                </div>
            </div>

            <div className="formRow">
                <div className="formControl">            
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" onInput={formInputHandler} required/>
                </div>
            </div>

            <div className="formRow">
                <div className="formControl">            
                    <label htmlFor="">Confirrm Password</label>
                    <input type="password" onChange={validatePassword} required/>
                </div>
            </div>

            <div className="formFooter">
                <div className="remember">
                    <input type="checkbox" />
                    <label htmlFor="">Remember Me?</label>
                </div>

                <label htmlFor="">Frogot Password?</label>
            </div>

            <p className="error">{error}</p>

            <button type="submit" disabled={disable}>Sign Up</button>

        </form>
        </>
    )
}
