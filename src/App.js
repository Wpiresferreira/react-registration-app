import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import Home from './pages/Home';
import Programs from './pages/Programs';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import Students from './pages/Students';
import Login from './pages/Login';
import Signin from './pages/Signin';


export default function App() {

  const myProperty = "Wagner"
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout property={myProperty}/>}>
          <Route index element={<Home property={myProperty}/>} />
          <Route path="programs" element={<Programs />} />
          <Route path="login" element={<Login />} />
          <Route path="signin" element={<Signin />} />
          <Route path="courses" element={<Courses />} />
          <Route path="students" element={<Students />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);