import { useState } from "react";
import { doSignup } from "../data/util";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const department = "SD Department";
  const [program, setProgram] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  function handleSubmit() {
    if (
      doSignup(
        firstName,
        lastName,
        email,
        phone,
        birthday,
        department,
        program,
        username,
        password,
        false
      )
    ) {
      alert("New user created sucessfully");
      navigate("/login");
    } else {
      alert("Error");
    }
  }

  return (
    <>
      <div>
        <h1>Signup Page Details:</h1>
        <h1>When signing up, students must provide:</h1>
        <h1>
          1. First Name, Last Name, Email, Phone, Birthday, Department (only SD
          department will be available), Program, Username, and Password.
        </h1>
        <h1>
          2. After signing up, the system generates a Student ID and redirects
          the student to either a login page or a welcome page (you can choose).
        </h1>
      </div>
      <div className="w-[600px] min-h-[300px] rounded-2xl items-center m-6 flex flex-col justify-around bg-[var(--color2)]">
        <div>Signup</div>
        <div className="m-3 h-12 w-[300px] bg-white rounded-2xl">
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
            type="text"
          ></input>
          <label className="pl-3 text-sm absolute">First Name</label>
        </div>
        <div className="m-3 h-12 w-[300px] bg-white rounded-2xl">
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
            type="text"
          ></input>
          <label className="pl-3 text-sm absolute">Last Name</label>
        </div>
        <div className="m-3 h-12 w-[300px] bg-white rounded-2xl">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
            type="email"
          ></input>
          <label className="pl-3 text-sm absolute">email</label>
        </div>
        <div className="m-3 h-12 w-[300px] bg-white rounded-2xl">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
            type="text"
          ></input>
          <label className="pl-3 text-sm absolute">Phone</label>
        </div>
        <div className="m-3 h-12 w-[300px] bg-white rounded-2xl">
          <input
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
            type="date"
          ></input>
          <label className="pl-3 text-sm absolute">Birthday</label>
        </div>
        <div className="m-3 h-12 w-[300px] bg-white rounded-2xl">
          <input
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
            type="text"
          ></input>
          <label className="pl-3 text-sm absolute">Program</label>
        </div>
        <div className="m-3 h-12 w-[300px] bg-white rounded-2xl">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
            type="text"
          ></input>
          <label className="pl-3 text-sm absolute">Username</label>
        </div>
        <div className="m-3 h-12 w-[300px] bg-white rounded-2xl">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
            type="password"
          ></input>
          <label className="pl-3 text-sm absolute">Password</label>
        </div>
        <div className="m-3 h-12 w-[300px] bg-white rounded-2xl">
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
            type="password"
          ></input>
          <label className="pl-3 text-sm absolute">Retype Password</label>
        </div>
        <div>
          <button
            className="h-10 w-24 rounded-2xl bg-[var(--color1)] hover:bg-[var(--color2)] text-white border-solid border-2 border-[var(--color1)] hover:text-[var(--color1)]"
            onClick={handleSubmit}
          >
            Signup
          </button>
        </div>
      </div>
    </>
  );
}
// export default function Signup() {
//   return (
//     <div>
//       <h1>Signup Page Details:</h1>
//       <h1>When signing up, students must provide:</h1>
//       <h1>
//         1. First Name, Last Name, Email, Phone, Birthday, Department (only SD
//         department will be available), Program, Username, and Password.
//       </h1>
//       <h1>
//         2. After signing up, the system generates a Student ID and redirects the
//         student to either a login page or a welcome page (you can choose).
//       </h1>
//     </div>
//   );
// }
