import React from 'react'
import Axios from 'axios'
import {useState,useEffect} from 'react'


function ClasscreationForm() {
const [students,setStudents]=useState([])
const [teachers,setTeachers]=useState([])
//adding form fields
const [classname,setClassName]=useState('')
const [starttime,setStartTime]=useState('')
const [endtime,setEndTime]=useState('')
const [days,setDays]=useState([])
const [link,setLink]=useState('')
const [teacherobjid, setTeacherObjId] = useState('')
const [studentid, setStudentId] = useState([])
const fetchteacher = async () => {
  try {
      const response = await Axios.get('https://classroom-uy4z.vercel.app/teachers')
      setTeachers(response.data.teachers)
  } catch (error) {
      console.error(error)
  }
}

const fetchstudent = async () => {
  try {
      const response = await Axios.get('http://localhost:8080/students')
      setStudents(response.data.students)
  } catch (error) {
      console.error(error)
  }
}
useEffect(() => {
  fetchteacher()
  fetchstudent()
}, [])


const handleDaysChange = (e) => {
  const value = e.target.value.split(',').map(day => day.trim()); // Convert comma-separated list to array and trim spaces
  setDays(value);
};
const handleStudent = (e) => {
  const selectedOptions = Array.from(e.target.selectedOptions)
  const selected = selectedOptions.map((s) => s.value)
  setStudentId(selected)
}
const handleTeacherChange = (e) => {
  const value = e.target.value;
  console.log('Selected Teacher ID:', value); 
  setTeacherObjId(value);
};

  const handleSubmit= async (e)=>{
          e.preventDefault()
          console.log('Teacher ID:', teacherobjid);
          if (!teacherobjid.trim()) {
            console.error('Teacher ID is required');
            return;
        }

          try{
const response=await Axios.post('http://localhost:8080/create-class',{classname,starttime,endtime,link,days,teacherobjid, studentid})
console.log(response.data.message)
      setClassName('')
      setStartTime('')
      setEndTime('')
      setLink('')
      setDays('')

          }catch(error){
            console.error('Error:', error.response ? error.response.data : error.message);
          }
  }
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create New Classroom</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="className" className="block text-gray-700">Classroom Name</label>
                    <input value={classname} onChange={(e)=>setClassName(e.target.value)}
                        type="text"
                        id="className"
                        
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="startTime" className="block text-gray-700">Start Time</label>
                    <input value={starttime} onChange={(e)=>setStartTime(e.target.value)}
                        type="text"
                        id="startTime"
                       
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="endTime" className="block text-gray-700">End Time</label>
                    <input value={endtime} onChange={(e)=>setEndTime(e.target.value)}
                        type="text"
                        id="endTime"
                       
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                
                <div className="mb-4">
                    <label htmlFor="googleMeetLink" className="block text-gray-700">Google Meet Link</label>
                    <input value={link}
                    onChange={(e)=>setLink(e.target.value)}
                        type="url"
                        id="googleMeetLink"
                       
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="days" className="block text-gray-700">Days </label>
                    <input
                        value={days.join(', ')} // Display days as a comma-separated list
                        onChange={handleDaysChange}
                        type="text"
                        id="days"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    
                </div>


                <div className="mb-4">
                <label htmlFor="Assign teachers" className="block text-gray-700">Assign Teacher</label>
                <select value={teacherobjid}
                    onChange={handleTeacherChange}
                    id="teacherlist"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                >
                    <option value="">Select a teacher</option>
                    {teachers.map((teacher) => (
                        <option key={teacher._id} value={teacher._id}>{teacher.username}</option>
                    ))}
                </select>
            </div>



            <div className="mb-4">
                <label htmlFor="Assign students" className="block text-gray-700">Assign Students</label>
                <select value={studentid} onChange={handleStudent} multiple={true} id="studentslist" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                    {students.map((student) => (
                        <option key={student._id} value={student._id}>{student.username}</option>
                    ))}
                </select>
            </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Create Classroom
                </button>
            </form>
        </div>
  )
}

export default ClasscreationForm
