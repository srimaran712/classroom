import React from 'react'
import Axios from 'axios'
import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { removeToken } from '../auth'

function StudentDashboard() {
    const[classroom,setClassRoom]=useState(null)
    const navigate=useNavigate()
    const fetchstudent= async()=>{
        try{
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return;
            }
            const response= await Axios.get('https://classroom-back.onrender.com/dashboard-students',
               {
                headers:{
                      Authorization: `Bearer ${token}`
                }
               }
            )
       
        setClassRoom(response.data.classroom)
        }catch(error){
            console.error('Error fetching classroom details:', error.response ? error.response.data : error.message);
        }
       
    }
    useEffect(()=>{
       fetchstudent()    
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
    if (!classroom) {
        return <div>Loading...</div>; // Display loading state while fetching data
    }
  return (
    <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white py-4">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold">Student Dashboard</h1>
                </div>
            </header>
            <main className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">{classroom.name}</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-medium">Class Details:</h3>
                        <h4 className="text-md font-medium">Your Teacher : {classroom.teacher?classroom.teacher.username: 'No Teacher has Assigned'}</h4>
                        <p>Start Time: <span className="font-semibold">{classroom.startTime}</span></p>
                        <p>End Time: <span className="font-semibold">{classroom.endTime}</span></p>
                        <p>Google Meet Link: <a href={classroom.googlemeet} className="text-blue-500">Join the Link </a></p>
                    </div>
                </div>
                <button onClick={handleLogout} className="px-24 py-3 bg-orange-300 text-white font-semibold drop-shadow-md">Log out</button>         
                
            </main>
            <div className="mt-2">
                <h1 className="m-2 font-bold">Classmates here</h1>
                <ul className="py-3 px-2 bg-gray-200">
                    {classroom.students.map((student)=>{
                        return(
                            <li className="shadow-lg text-2xl text-gray-600"key={student._id}>{student.username}</li>
                        )
                    })}
                </ul>
            </div>
        </div>

  )
}

export default StudentDashboard
