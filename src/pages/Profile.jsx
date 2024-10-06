import { useEffect, useState } from "react";
import { getLoggedUser } from "../data/util";

const Home = () => {
  const [loggedUser, setLoggedUser] = useState("");

  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // const [birthday, setBirthday] = useState("");
  // const [department,setDepartment] = useState("");
  // const [program, setProgram] = useState("");
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    setLoggedUser(
      getLoggedUser(JSON.parse(sessionStorage.getItem("sessionId")).sessionId)
    );
  //   setFirstName(loggedUser.firstName);
  //   setLastName(loggedUser.lastName);
  //   setEmail(loggedUser.email);
  // setBirthday(loggedUser.birthday);
  // setDepartment(loggedUser.department);
  // setPhone(loggedUser.phone);
  // setProgram(loggedUser.program);
  // setUsername(loggedUser.username);
  // setPassword(loggedUser.password);
  // setNewPassword(loggedUser.newPassword);
  }, [
    
  ]);

  function handleSave() {}

  return (
    <div>
      <div className="flex flex-col justify-start items-start">
        <h1>
          View Profile: Students and Admins can view their profile information.
        </h1>
        <h1> Welcome {loggedUser.firstName}, </h1>
      </div>

      <div className="w-[600px] min-h-[300px] rounded-2xl items-center m-6 flex flex-col justify-around bg-[var(--color2)]">
        <div>Profile</div>
        <div className="m-3 h-12 w-[300px] bg-slate-400 rounded-2xl">
          <input disabled
            value={loggedUser.firstName}
            // onChange={(e) => setFirstName(e.target.value)}
            className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
            type="text"
          ></input>
          <label className="pl-3 text-sm absolute">First Name</label>
        </div>
        <div className="m-3 h-12 w-[300px] bg-slate-400 rounded-2xl">
          <input disabled
            value={loggedUser.lastName}
            // onChange={(e) => setLastName(e.target.value)}
            className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
            type="text"
          ></input>
          <label className="pl-3 text-sm absolute">Last Name</label>
        </div>
        <div className="m-3 h-12 w-[300px] bg-slate-400 rounded-2xl">
          <input disabled
            value={loggedUser.email}
            // onChange={(e) => setEmail(e.target.value)}
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
        <div className="m-3 h-12 w-[300px] bg-slate-400 rounded-2xl">
          <input
            value={loggedUser.birthday}
            // onChange={(e) => setBirthday(e.target.value)}
            className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
            type="date"
          ></input>
          <label className="pl-3 text-sm absolute">Birthday</label>
        </div>
        <div className="m-3 h-12 w-[300px] bg-slate-400 rounded-2xl">
          <input disabled
            value={loggedUser.department}
            // onChange={(e) => setProgram(e.target.value)}
            className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
            type="text"
          ></input>
          <label className="pl-3 text-sm absolute">Department</label>
        </div>
        <div className="m-3 h-12 w-[300px] bg-slate-400 rounded-2xl">
          <input disabled
            value={loggedUser.program}
            // onChange={(e) => setDepartment(e.target.value)}
            className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
            type="text"
          ></input>
          <label className="pl-3 text-sm absolute">Program</label>
        </div>
        <div className="m-3 h-12 w-[300px] bg-slate-400 rounded-2xl">
          <input
            value={loggedUser.username}
            // onChange={(e) => setUsername(e.target.value)}
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
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
