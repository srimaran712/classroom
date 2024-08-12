import React from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import { removeToken } from '../auth'
import '../Principal.css'


function PrincipalNavbar() {
    const navigate=useNavigate()
    const handleLogout=()=>{
        try{
            removeToken()
            navigate('/login')

        }
        catch(error){
            console.error(error)
        }
    }
  return (
    <div className="container">
        <nav className="flex p-10 space-x-20 items-center justify-between">
         <h1 className="text-black font-extrabold text-3xl">Star School</h1>
          <h3 className="text-gray-800 font-semibold text-2xl tracking-wider">Welcome Prinicpal!</h3>
         <button onClick={handleLogout} className="px-24 py-3 bg-rose-500 text-white font-semibold drop-shadow-md">Log out</button>
        </nav>
    </div>
  )
}

export default PrincipalNavbar
