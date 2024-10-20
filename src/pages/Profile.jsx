import { useEffect, useState } from "react";
import { getLoggedUser, saveProfile } from "../data/util";

const Home = () => {
  const [loggedUser, setLoggedUser] = useState("");
  const [phone, setPhone] = useState(loggedUser.phone);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlertMessage, setShowAlertMessage] = useState(false);

  useEffect(() => {
    setLoggedUser(
      getLoggedUser(JSON.parse(sessionStorage.getItem("sessionId")).sessionId)
    );
  }, []);

  useEffect(() => {
    setPhone(loggedUser.phone);
  }, [loggedUser]);

  function handleSave() {
    //check if password was typed and changed
    if (
      (phone === "" || phone === loggedUser.phone) &&
      password === "" &&
      newPassword === ""
    ) {
      setAlertMessage("No changes were made");
      setShowAlertMessage(true);
      return;
    } else if (
      (password.length > 0 || newPassword.length > 0) &&
      password !== newPassword
    ) {
      setAlertMessage("New Password and Retyped new Password doesn't match");
      setShowAlertMessage(true);
      return;
    } else {
      const tempUser = loggedUser;
      if (phone) {
        tempUser.phone = phone;
      }
      if (password) {
        tempUser.password = password;
      }
      setLoggedUser(tempUser);

      saveProfile(loggedUser);
      setAlertMessage("Changes saved");
      setShowAlertMessage(true);
      setPassword("")
      setNewPassword("")
    }
  }

  const closeAlertMessage = () => {
    setShowAlertMessage(false);
  };

  return (
    <div>
      <div className="flex flex-col justify-start items-center">
        <div
          className={` rounded-2xl ${
            showAlertMessage ? null : "hidden"
          } z-10 flex flex-col justify-around items-center w-[50vw] h-[50vh] fixed bg-red-300`}
        >
          <div>{alertMessage}</div>
          <button
            onClick={closeAlertMessage}
            className={`text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
          >
            Close
          </button>
        </div>
        <h1> Welcome {loggedUser.firstName}, </h1>

        <div className="w-[600px] min-h-[300px] rounded-2xl items-center m-6 flex flex-col justify-around bg-[var(--color2)]">
          <div>Profile</div>
          <div className="m-3 h-12 w-[300px] bg-slate-400 rounded-2xl">
            <input
              disabled
              value={loggedUser.firstName}
              // onChange={(e) => setFirstName(e.target.value)}
              className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
              type="text"
            ></input>
            <label className="pl-3 text-sm absolute">First Name</label>
          </div>
          <div className="m-3 h-12 w-[300px] bg-slate-400 rounded-2xl">
            <input
              disabled
              value={loggedUser.lastName}
              // onChange={(e) => setLastName(e.target.value)}
              className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
              type="text"
            ></input>
            <label className="pl-3 text-sm absolute">Last Name</label>
          </div>
          <div className="m-3 h-12 w-[300px] bg-slate-400 rounded-2xl">
            <input
              disabled
              value={loggedUser.email}
              // onChange={(e) => setEmail(e.target.value)}
              className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
              type="email"
            ></input>
            <label className="pl-3 text-sm absolute">email</label>
          </div>
          <div className="m-3 h-12 w-[300px] bg-white rounded-2xl">
            <input
              defaultValue={loggedUser.phone}
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
            <input
              disabled
              value={loggedUser.department}
              // onChange={(e) => setProgram(e.target.value)}
              className="absolute w-[280px] ml-[18px] h-8 mt-4 bg-[transparent]"
              type="text"
            ></input>
            <label className="pl-3 text-sm absolute">Department</label>
          </div>
          <div className="m-3 h-12 w-[300px] bg-slate-400 rounded-2xl">
            <input
              disabled
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
    </div>
  );
};

export default Home;
