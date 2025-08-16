import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginSignup from "./pages/loign&signup/LoginSignup"
import Friends from "./pages/User/Friends/Friends"
import Trip from "./pages/User/Trip/Trip"
import UserHome from "./pages/User/Home/Home"
import Layout from "./pages/User/Layout"
import "./App.css"
import Profile from './pages/User/Profile/Profile'
import Home from './pages/Home/Home'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<LoginSignup page="Login" />} />
          <Route path='/signup' element={<LoginSignup page="Sign Up" />} />

          <Route path='/user' element={<Layout />}>
            <Route index element={<UserHome />} />
            <Route path="home" element={<UserHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="friends" element={<Friends />} />
            <Route path="trip/:id" element={<Trip />} />
          </Route>

          <Route path='*' element={<LoginSignup page="Login" />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )
}

export default App
