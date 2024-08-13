import React from 'react'
import Axios from 'axios'
import {useState,useEffect} from 'react'

function Studentlist() {
  const [students,setStudents]=useState([])

  const fetchStudents=async ()=>{
    try {
      const response = await Axios.get('https://classroom-uy4z.vercel.app/students')
      setStudents(response.data.students)
  } catch (error) {
      console.error(error)
  }
 
  }

  useEffect(()=>{
    fetchStudents()
  },[])

  //handle delete

  const handleDelete= async(id)=>{
   try{
    const response= await Axios.delete(`https://classroom-uy4z.vercel.app/students/${id}`)
    console.log(response.data.message)
    setStudents((prevStudent) => prevStudent.filter(student => student._id !== id));
   } catch(error){
    console.error(error)
   }
  }
  return (
    <div className="px-20 py-2 mx-auto ">
      <h1 className="text-black text-3xl font-bold text-center m-2">Students Data</h1>
      <table class="table-auto w-full px-3 py-3 border-collapse border border-slate-900">
  <thead className="bg-slate-200 px-3 py-4 ">
    <tr className="py-3" >
      <th className="text-gray-700 font-semibold tracking-wide text-xl py-4">Teachers Name</th>
      <th className="text-gray-700 font-semibold tracking-wide text-xl py-4">Teachers Email</th>
    
    </tr>
  </thead>
  <tbody className="border-collapse border-spacing-1">
   {students.map((student)=>{
    return(
      <tr className="py-5" key={student._id}>
        <td className="text-gray-600 font-normal text-md py-2 text-center border border-slate-300">{student.username}</td>
        <td className="text-gray-600 font-normal text-md py-2 text-center border border-slate-300">{student.email}</td>
        <td className="text-center"><button className="text-white mt-5 bg-red-700 py-2 px-5 text-md s" onClick={()=>handleDelete(student._id)}>Delete</button></td>
      </tr>
    )
   })}
    </tbody>
    </table>
    </div>
  )
}

export default Studentlist

