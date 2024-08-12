
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import PrincipalDashboard from './pages/PrincipalDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
  
     <div className="App">
        <BrowserRouter>

        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard-principal" element={<ProtectedRoute element={PrincipalDashboard}/>}/>
        <Route path="/dashboard-teacher" element={<ProtectedRoute element={TeacherDashboard}/>}/>
        <Route path="/dashboard-students" element={<ProtectedRoute element={StudentDashboard}/>}/>
       
      </Routes>
        </BrowserRouter>
      
      </div>
   
   
  );
}

export default App;
