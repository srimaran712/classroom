import React from 'react'

import Axios from 'axios'
import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { removeToken } from '../auth'

const TeacherDashboard=()=>{
    const[classDetails,setClassdetails]=useState(null)
    const navigate=useNavigate()
    const fetchdetails= async()=>{
        try{
            const token = localStorage.getItem('token');
            const response= await Axios.get('http://localhost:8080/dashboard-teacher',
               {
                headers:{
                      Authorization: `Bearer ${token}`
                }
               }
            )
        console.log(response.data.classDetails)
        setClassdetails(response.data.classDetails)
        }catch(error){
            console.error(error)
        }
       
    }
    useEffect(()=>{
       fetchdetails()     
    },[])
    const handleLogout=()=>{
        try{
            removeToken()
            navigate('/login')

        }
        catch(error){
            console.error(error)
        }
    }
    if (!classDetails) {
        return <div>Loading...</div>; // Display loading state while fetching data
    }
    return(
        <div>
            <div className="container mx-auto">
                    <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
                </div>
            <h1 className="text-3xl text-gray-800 font-bold">Hello! {classDetails.teacher.username}</h1>
            <h2 >Here is your Assigned class details</h2>
            <div className="py-3 bg-gray-50 shadow-lg px-3 m-28" key={classDetails._id}>
                <h1>{classDetails.name}</h1>
                <h2>{classDetails.startTime}</h2>
                <h2>{classDetails.endTime}</h2>
                <ul>
                    {classDetails.days.map((day, index) => (
                        <li key={index}>{day}</li>
                    ))}
                </ul>
                <h1>{classDetails.googlemeet}</h1>
                <ul>
                    {classDetails.students.map((student) => (
                        <li key={student._id}>{student.username} {student.email}</li>
                    ))}
                </ul>
            </div>
            <button onClick={handleLogout} className="px-24 py-3 bg-rose-500 text-white font-semibold drop-shadow-md">Log out</button>
        </div>
    )
}


export default TeacherDashboard