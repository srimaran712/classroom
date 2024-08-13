import React from 'react'
import Axios from 'axios' 
import {useState} from 'react'


function AccountCreationForm() {
  
    const[username,setUserName]=useState('')
    const[useremail,setUserEmail]=useState('')
    const[userpassword,setUserPassword]=useState('')
    const[userrole,setUserRole]=useState('')
    const [message,setMessage]=useState('')
    const handleAccountsubmit= async(e)=>{
        e.preventDefault()
        try{
          const response=  await Axios.post('http://classroom-uy4z.vercel.app/create-account',{
                username,useremail,userpassword,userrole
            })
            console.log(response.data)
            setMessage(response.data.message)
            setUserName('')
            setUserEmail('')
            setUserPassword('')
            setUserRole('')
          setTimeout(()=>{
            setMessage('')
          },5000)

        }catch (error){
            console.log(error)
        }
    }
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
     
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="font-extrabold text-3xl shadow-sm mt-3">Account Creation</h2>
      <form className="space-y-6 mt-4" onSubmit={handleAccountsubmit}>

          <div>
           <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">User Name</label>
             <div className="mt-2" >
                <input type="text" value={username} onChange={
                    (e)=>setUserName(e.target.value)
                } className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
             </div>
          </div>

          <div>
           <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">User Email</label>
             <div className="mt-2" >
                <input type="email" value={useremail} onChange={
                    (e)=>setUserEmail(e.target.value)
                } className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
             </div>
          </div>
          <div>
           <label htmlFor="password"  className="block text-sm font-medium leading-6 text-gray-900">User Password</label>
             <div className="mt-2" >
                <input type="password" value={userpassword} onChange={
                    (e)=>setUserPassword(e.target.value)
                } className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
             </div>
          </div>

          <div>
           <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">User Role</label>
             <div className="mt-2" >
                <select  value ={userrole} onChange={
                    (e)=>setUserRole(e.target.value)
                } className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option value="">Select a role</option>
                    <option value="Principal">Principal</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                </select>
             </div>
          </div>
          <div>
          <div className="mt-2">
        <button type="submit" className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create New Account</button>
      </div>
          </div>
          
      </form>
      <h3 className="font-light text-gray-500">{message} </h3>
    </div>
  </div>
  )
}

export default AccountCreationForm
