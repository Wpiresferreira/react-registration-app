import { useState } from "react";
import { doLogin } from "../data/util";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("jamessmith");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    if (doLogin(username, password)) {
      navigate("/");
    } else {
      alert("Incorrect Credentials!");
    }
  }

  function handleForgotPassword() {
    //ToDo
    
    alert('Not implemented yet')
  }
  return (
    <div className="flex justify-center w-[100vw]">
      <div className="w-[90vw] max-w-[600px] rounded-2xl items-center m-6 flex flex-col justify-around bg-[var(--color2)]">
        <div>Login</div>
        <div className="h-12 w-[300px] bg-white rounded-2xl">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
            type="text"
          ></input>
          <label className="pl-3 text-sm absolute">Username</label>
        </div>
        <div className="h-12 w-[300px] bg-white rounded-2xl">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
            type="password"
          ></input>
          <label className="pl-3 text-sm absolute">Password</label>
        </div>
        <div>
          <button
            className="h-10 w-24 rounded-2xl bg-[var(--color1)] hover:bg-[var(--color2)] text-white border-solid border-2 border-[var(--color1)] hover:text-[var(--color1)]"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
        <button onClick={handleForgotPassword}>Forgot your password ?</button>
      </div>
    </div>
  );
}
