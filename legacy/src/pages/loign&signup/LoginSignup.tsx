import { Link } from "react-router-dom"
import SignupForm from "./components/SignupForm"
import LoginForm from "./components/loginForm"
import "./login&signup.css"

export default function LoginSignup({page}: any) {
  return (

    <div className="loginSignup">

      <div className="loginImage">
        {
          page=="Login"?
          <h1>Welcome <br /> Back!</h1>:
          <h2>Welcome, <br /> to the new world</h2>
        }
      </div>

      <div className="loginFormCont">

        <h1>{page}</h1>
        <p>
          Struggling to keep track of your expenses? <br /> Dont worry, We are here for you!
        </p>

        {page=='Login'?
          <LoginForm/>
        : <SignupForm/>
        }

        <div className="formFooter">
            <span></span>
            <span> {
              page=='Login'?
              <>New User? <Link to={'/signup'} >Sign Up</Link></>:
              <>Have an account? <Link to={'/login'} >Login</Link></>
            } 
            </span>
        </div>

      </div>

    </div>

  )
}

