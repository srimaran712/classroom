import React from 'react'
import '../Principal.css'
import PrincipalNavbar from '../components/PrincipalNavbar'
import AccountCreationForm from '../components/AccountCreationForm'
import Studentlist from '../components/Studentlist'
import Teacherslist from '../components/Teacherslist'
import ClasscreationForm from '../components/ClasscreationForm'
import ClassroomList from '../components/ClassroomList'
import {useState} from 'react'

function PrincipalDashboard() {
  const [view,setView]=useState('account')
  return (
    <div>
     <PrincipalNavbar/>
     <div className="flex bg-zinc-200  justify-between items-center px-20 py-3 mt-2">
      <button className="bg-orange-400 text-white font-normal text-md px-4 py-2 rounded-md shadow-md" onClick={()=>setView('account')}>Create Account</button>
      <button className="bg-orange-700 text-white font-normal text-md px-4 py-2 rounded-md shadow-md" onClick={()=>setView('classroom')}>Create Classroom</button>
      <button className="bg-blue-400 text-white font-normal text-md px-4 py-2 rounded-md shadow-md" onClick={()=>setView('classroomlist')}>See Classrooms</button>
      <button className="bg-violet-400 text-white font-normal text-md px-4 py-2 rounded-md shadow-md"onClick={()=>setView('teacherslist')}>See Teachers</button>
      <button className="bg-purple-300 text-white font-normal text-md px-4 py-2 rounded-md shadow-md " onClick={()=>setView('studentslist')}>See Students</button>
     </div>
     <div>
      {view==='account' && <AccountCreationForm/>}
      {view==='classroom' && <ClasscreationForm/>}
      {view==='classroomlist' && <ClassroomList/>}
      {view==='teacherslist' && <Teacherslist/>}
      {view==='studentslist' && <Studentlist/>}
     </div>
    </div>
  )
}

export default PrincipalDashboard
