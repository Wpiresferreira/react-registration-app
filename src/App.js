import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from './Layout';
import Home from './pages/Home';
import Programs from './pages/Programs';
import Registration from './pages/Registration';
import Contact from './pages/Contact';
import Students from './pages/Students';
import StudentsDetails from './pages/StudentsDetails';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Profile from './pages/Profile';
import Logout from './pages/Logout';  
import Test from './pages/NotFound';
import Courses from './pages/Courses';
import NotFound from './pages/NotFound';



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="programs" element={<Programs />} />
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
          <Route path="*" element={<NotFound />} />
        </Route>
       
      </Routes>
    </BrowserRouter>
  );
}
