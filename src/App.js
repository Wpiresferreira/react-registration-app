import { users, messagesSample } from './data/data';
import { terms } from './data/terms';
import {courses} from './data/courses1';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from './Layout';
import Home from './pages/Home';
import Programs from './pages/Programs';
import EditPrograms from './pages/EditPrograms';
import Registration from './pages/Registration';
import Contact from './pages/Contact';
import Students from './pages/Students';
import StudentsDetails from './pages/StudentsDetails';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Profile from './pages/Profile';
import Logout from './pages/Logout';  
import Test from './pages/Test';
import Courses from './pages/Courses';
import { enrolments } from './data/enrolments';
import programs from './data/programs1';



export default function App() {

  useEffect (()=>{

    if(!localStorage.getItem("users")){
      localStorage.setItem("users",JSON.stringify(users))
    }

    if(!localStorage.getItem("messages")){
      localStorage.setItem("messages",JSON.stringify(messagesSample))
    }

    if(!localStorage.getItem("courses")){
      localStorage.setItem("courses", JSON.stringify(courses))
    }
    if(!localStorage.getItem("enrolments")){
      localStorage.setItem("enrolments", JSON.stringify(enrolments))
    }
    if(!localStorage.getItem("programs")){
      localStorage.setItem("programs", JSON.stringify(programs))
    }
    if(!localStorage.getItem("terms")){
      localStorage.setItem("terms", JSON.stringify(terms))
    }

  },[])

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="programs" element={<Programs />} />
          <Route path="edit-programs/:programCode" element={<EditPrograms />} />
          <Route path="courses" element={<Courses />} />
          <Route path="/courses/:programCode" element={<Courses />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="registration" element={<Registration />} />
          <Route path="students" element={<Students />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
          <Route path="test" element={<Test />} />
          <Route path="logout" element={<Logout />} />
          <Route path="students-details" element={<StudentsDetails />} />
          <Route path="/students-details/:studentId" element={<StudentsDetails />} />
          <Route path="*" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
