import React from 'react'
import { setToken } from '../auth'
import {useState,useEffect} from 'react'
import Axios from 'axios'
import {jwtDecode} from 'jwt-decode'
import {useNavigate} from 'react-router-dom'

function Login() {
    const [loginEmail,setLoginEmail]=useState('')
    const [loginPassword,setLoginPassword]=useState('')
   const navigate=useNavigate()
const handleSubmit= async (e)=>{
       e.preventDefault()
   try{
  const response= await Axios.post('http://localhost:8080/login',{loginEmail,loginPassword})
  const {token}=response.data
  setToken(token)
  console.log(response.data)
  const {role}=jwtDecode(token)
if(role==='Principal'){
  navigate('/dashboard-principal')
}
else if(role==="Teacher"){
  navigate('/dashboard-teacher')
}
else {
  navigate('/dashboard-students')
}

}catch(error){
  console.error('role not found')
  navigate('/login')
}
     
}

  return (
    <div className="max-w-auto">
      
      <h1 className='text-center text-gray-800 text-3xl font-bold mt-16'>Please Login Here</h1>

      <form className="max-w-2xl px-32 py-10 bg-slate-50 drop-shadow-md mt-20 ml-96" onSubmit={handleSubmit}>
       <label className="text-gray-800 font-extralight text-md m-5 p-3">Enter your Email</label>

       <input type="email" value={loginEmail} onChange={(e)=> setLoginEmail(e.target.value)}
        className="max-w-xl border-none drop-shadow-md px-32 py-3 items-center"/><br/><br/>
       <label className="text-gray-800 font-extralight text-md m-6 p-3">Enter your Password</label>

       <input type="password" value={loginPassword} onChange={(e)=> setLoginPassword(e.target.value)}className="max-w-xl border-none drop-shadow-md px-32 py-3"/>
        <button type="submit" className="bg-violet-400 text-white text-2xl px-32 py-2 mt-10" >Login </button>
      </form>
    </div>
  )
}

export default Login
