import { useEffect, useState } from "react";
import { getLoggedUser, updateUser } from "../data/api";
import { useMask } from "@react-input/mask";
import Alert from "../components/Alert";

export default function Profile() {
  const inputRef = useMask({
    mask: "+_ (___) ___-____",
    replacement: { _: /\d/ },
  });

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const [loggedUser, setLoggedUser] = useState(null); // Initialize to null
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve user information using the sessionId
    async function getData() {
      const user = await getLoggedUser();
      setLoggedUser(user.response);
      setIsLoading(false);
    }
    getData();
  }, []);

  useEffect(() => {
    if (loggedUser) {
      setPhone(loggedUser.phone);
    }
  }, [loggedUser]);

  async function handleSave() {
    //check if password was typed and changed
    if (
      (phone === "" || phone === loggedUser.phone) &&
      password === "" &&
      newPassword === ""
    ) {
      setAlertMessage("No changes were made");
      setTypeAlert("alert");
      setShowMessage(true);
      return;
    } else if (
      (password.length > 0 || newPassword.length > 0) &&
      password !== newPassword
    ) {
      setAlertMessage("New Password and Retyped new Password doesn't match");
      setTypeAlert("alert");
      setShowMessage(true);
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

      const result = await updateUser(loggedUser);
      if (result.status < 300) {
        setTypeAlert("sucess");
      } else {
        setTypeAlert("alert");
      }
      setAlertMessage(result.response.message);
      setShowMessage(true);
      setPassword("");
      setNewPassword("");
    }
  }
  const hideMessage = () => {
    setShowMessage(false);
  };

  if (isLoading) return <div> Loading . . .</div>;
  return (
    <div>
      <div className="flex items-center flex-col container mx-auto my-2 p-5 bg-gray-50 shadow-lg min-h-[55vh] rounded-xl max-w-[400px] border border-solid border-gray-300">
        <div>Profile</div>
        <div className="w-full">
          <label>First Name</label>
          <input
            readOnly={true}
            value={loggedUser.first_name}
            className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-3 focus:shadow-lg"
            type="text"
          ></input>
        </div>
        <div className="w-full">
          <label>Last Name</label>
          <input
            readOnly={true}
            value={loggedUser.last_name}
            // onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-3 focus:shadow-lg"
            type="text"
          ></input>
        </div>
        <div className="w-full">
          <label>email</label>
          <input
            readOnly={true}
            value={loggedUser.email}
            // onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-3 focus:shadow-lg"
            type="email"
          ></input>
        </div>
        <div className="w-full">
          <label>Phone</label>
          <input
            ref={inputRef}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-3 focus:shadow-lg"
            type="text"
          ></input>
        </div>
        <div className="w-full">
          <label>Birthday</label>
          <input
            value={new Intl.DateTimeFormat("en-CA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(Date.parse(loggedUser.birthday))}
            readOnly={true}
            // onChange={(e) => setBirthday(e.target.value)}
            className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-3 focus:shadow-lg"
            type="date"
          ></input>
        </div>
        <div className="w-full">
          <label>Department</label>
          <input
            readOnly={true}
            value={loggedUser.department}
            // onChange={(e) => setProgram(e.target.value)}
            className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-3 focus:shadow-lg"
            type="text"
          ></input>
        </div>
        <div className="w-full">
          <label>Program</label>
          <input
            readOnly={true}
            value={loggedUser.program}
            // onChange={(e) => setDepartment(e.target.value)}
            className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-3 focus:shadow-lg"
            type="text"
          ></input>
        </div>
        <div className="w-full">
          <label>Username</label>
          <input
            readOnly={true}
            value={loggedUser.username}
            // onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-3 focus:shadow-lg"
            type="text"
          ></input>
        </div>
        <div className="w-full">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-3 focus:shadow-lg"
            type="password"
          ></input>
        </div>
        <div className="w-full">
          <label>Confirm Password</label>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-3 focus:shadow-lg"
            type="password"
          ></input>
        </div>
        <div>
          <button
            className={`text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color1)] border-solid border-2 border-[var(--color1)] hover:text-[var(--color1)] hover:bg-white`}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
      {/* </div> */}
      {showMessage ? (
        <Alert
          showMessage={showMessage}
          message={alertMessage}
          onClick={hideMessage}
          type={typeAlert}
        />
      ) : null}
    </div>
  );
}
