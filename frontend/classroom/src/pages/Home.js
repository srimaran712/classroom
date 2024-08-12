import React from 'react'
import {NavLink} from 'react-router-dom'

function Home() {
  return (
    <div className="container mx-auto">
      
    
      <div className="flex justify-center items-center ">
      <h1 className="text-4xl text-black font-bold p-48 text-center flex-column">
        Welcome to Star Matriculation School
      </h1>
      <NavLink to='/login' className="px-32 py-10  bg-indigo-500 text-white font-semibold text-xl max-w-2xl ml-96 ">Login</NavLink>
      </div>
     
    </div>
  )
}

export default Home
