import { useState } from "react";
import { doLogin } from "../data/api";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  async function handleSubmit() {
    const result = await doLogin(username, password);
    if (result.status) {
      setPassword("");
      setAlertMessage(result.response.message);

      if (result.status < 300) {
        setTypeAlert("sucess");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setTypeAlert("alert");
      }
      setShowMessage(true);
    }
  }
  function hideMessage(){
    setShowMessage(false);
  };

  return (
    <div className="flex justify-center items-center w-[100vw]">
      <div
      className="flex items-center flex-col container mx-12 my-auto p-5 bg-gray-50 shadow-lg min-h-[55vh] rounded-xl max-w-[400px] border border-solid border-gray-300"
      >
        <h1 className="my-4">Login</h1>
        <div>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-4 focus:shadow-lg"
            type="text"
            ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-4 focus:shadow-lg"
            type="password"
          ></input>
        </div>
        <div>
          <button
            className={`text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color1)] border-solid border-2 border-[var(--color1)] hover:text-[var(--color1)] hover:bg-white focus:shadow-lg`}
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
      {showMessage ? (
        <>
          <Alert
            showMessage={showMessage}
            message={alertMessage}
            onClick={hideMessage}
            type={typeAlert}
          />
        </>
      ) : null}
    </div>
  );
}
