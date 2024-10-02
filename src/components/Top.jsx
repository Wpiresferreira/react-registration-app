import { Link, useNavigate } from "react-router-dom";
import logo from "../images/Logo.svg";

export default function Top() {
  const navigate = useNavigate();


  return (
    <div className="flex flex-col justify-between w-[100vw] text-center bg-white shadow-[0px_12px_12px_-6px_rgba(3,26,98,0.16)]">
      <div className="flex justify-around items-center">
        <div className="p-7 leading-[100px]">
          <img src={logo} alt="logo"></img>
        </div>
        <div className="grow h-[100px] leading-[100px] text-ellipsis text-2xl font-bold">
          Course Registration
        </div>
        
        <button
          onClick={() => navigate("/signup")} className="text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white">
          Sign up
        </button>
        <button
          onClick={() => navigate("/login")} className="text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white">
          Login
        </button>
        <button
          onClick={() => navigate("/profile")}
          className=" fa  fa-user text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white"
        ></button>
      </div>

      <nav>
        <ul className="flex w-[100vw]">
          <li className=" relative inline-block grow  text-white text-center bg-[var(--color1)]">
            <div></div>
          </li>
          <li className=" relative inline-block grow  text-white text-center bg-[var(--color1)] hover:bg-[var(--color2)]">
            <Link className="block py-3" to="/">Home</Link>
          </li>
          <li className=" relative inline-block grow  text-white text-center bg-[var(--color1)] hover:bg-[var(--color2)]">
            <Link className="block py-3" to="/programs">Programs</Link>
          </li>
          <li className=" relative inline-block grow  text-white text-center bg-[var(--color1)] hover:bg-[var(--color2)]">
            <Link className="block py-3" to="/registration">Registration</Link>
          </li>
          <li className=" relative inline-block grow  text-white text-center bg-[var(--color1)] hover:bg-[var(--color2)]">
            <Link className="block py-3" to="/students">Students</Link>
          </li>
          <li className=" relative inline-block grow  text-white text-center bg-[var(--color1)] hover:bg-[var(--color2)]">
            <Link className="block py-3" to="/contact">Contact</Link>
          </li>
          <li className=" relative inline-block grow  text-white text-center bg-[var(--color1)]">
            <div></div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
