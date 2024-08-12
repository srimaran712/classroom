import React from "react";
import {useState,useEffect} from 'react'
import Axios from 'axios'



const ClassroomList = () => {
  const[classlist,setClasslist]=useState([])
  const fetchClass= async()=>{
    try{
      const response= await Axios.get('http://localhost:8080/classroom')
      setClasslist(response.data.createdClass)
    }catch(error){
      console.error(error)
    }
  }
  useEffect(()=>{
    fetchClass()
  },[])
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Classroom Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classlist.map((classroom) => (
          <div key={classroom.id} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{classroom.name}</h2>
            <p className="text-gray-700">Teacher: {classroom.teacher.username}</p>
            <p className="text-gray-700">Start Time: {classroom.startTime}</p>
            <p className="text-gray-700">End Time: {classroom.endTime}</p>
            <a
              href={classroom.googlemeet}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-4 block"
            >
              Join Google Meet
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassroomList;

