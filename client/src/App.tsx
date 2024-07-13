import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import LoginSignup from "./pages/loign&signup/LoginSignup"
import Layout from "./pages/User/Layout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginSignup page="Login"/>} />
        <Route path='/signup' element={<LoginSignup page="Sign Up"/>} />
        <Route path='/user' element={<Layout/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
