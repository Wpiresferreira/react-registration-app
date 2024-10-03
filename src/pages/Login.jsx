import { useState } from "react";
import { doLogin } from "../data/util";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('jamessmith')
    const [password, setPassword] = useState('')

    function handleSubmit(){
        if(doLogin(username, password)){
            navigate("/")
        }
    }
  return (
    <div className="w-[600px] h-[300px] rounded-2xl items-center m-6 flex flex-col justify-around bg-[var(--color2)]">
      <div>Login</div>
      <div className="h-12 w-[300px] bg-white rounded-2xl">
        <input
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
          className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
          type="text"
        ></input>
        <label className="pl-3 text-sm absolute">Username</label>
      </div>
      <div className="h-12 w-[300px] bg-white rounded-2xl">
        <input
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
          className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
          type="password"
        ></input>
        <label className="pl-3 text-sm absolute">Password</label>
      </div>
      <div>
        <button className="h-10 w-24 rounded-2xl bg-[var(--color1)] hover:bg-[var(--color2)] text-white border-solid border-2 border-[var(--color1)] hover:text-[var(--color1)]"
        onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}
// export default function Page() {
//   return (
//     <div className="flex items-center justify-center">
//       <form className=" rounded-lg flex flex-col w-[80vw] bg-sky-100 items-center">
//         <div className="m-4 text-2xl font-bold">Login</div>
//         <label htmlFor="username">
//           Username
//           <input
//             name="username"
//             type="email"
//             className="m-2 border-2 border-solid border-blue-950 rounded-md"
//           ></input>
//         </label>
//         <label htmlFor="password">
//           Password
//           <input
//             name="passwordusername"
//             type="password"
//             className="m-2 border-2 border-solid border-blue-950 rounded-md"
//           ></input>
//         </label>
//         <div>
//           <button
//             className="w-36 h-11 rounded-lg m-2 bg-sky-400 hover:bg-sky-900 text-white"
//             type="submit"
//           >
//             {" "}
//             Sign Up{" "}
//           </button>
//           <button
//             className="w-36 h-11 rounded-lg m-2 bg-sky-950 over:bg-sky-900 text-white"
//             type="submit"
//           >
//             {" "}
//             Login{" "}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
