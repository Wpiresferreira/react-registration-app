import { Link } from "react-router-dom";

export default function Top() {
  return (
    <div className="flex flex-col justify-between w-[100vw] text-center bg-gray-300">
    <div className="flex justify-around">
        <div className="h-[100px] leading-[100px]">LOGO</div>
        <div className="grow h-[100px] leading-[100px]">Bow Valley Registration</div>
        <div className=" h-[100px] leading-[100px]">Login / Logout</div>
        </div>
        
          <nav >
        <ul className="flex w-[100vw]">
          <li className="p-4 grow text-center bg-red-50">
            <div></div>
          </li>
          <li className="p-4 grow text-center bg-red-50">
            <Link to="/">Home</Link>
          </li>
          <li className="p-4 grow text-center bg-red-50">
            <Link to="/programs">Programs</Link>
          </li>
          <li className="p-4 grow text-center bg-red-50">
            <Link to="/courses">Courses</Link>
          </li>
          <li className="p-4 grow text-center bg-red-50">
            <Link to="/students">Students</Link>
          </li>
          <li className="p-4 grow text-center bg-red-50">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="p-4 grow text-center bg-red-50">
            <div></div>
          </li>
          
        </ul>
      </nav>
    </div>
  );
}
