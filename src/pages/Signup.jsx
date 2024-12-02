import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMask } from "@react-input/mask";
import { getPrograms, signup } from "../data/api";
import Alert from "../components/Alert";

export default function Signup(){
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [allPrograms, setAllPrograms] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const inputRef = useMask({
    mask: "+_ (___) ___-____",
    replacement: { _: /\d/ },
  });
  

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const allPrograms = await getPrograms("");
      setAllPrograms(allPrograms);
      setSelectedProgram(allPrograms[0].programcode);
      setIsLoading(false);
    }
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new student object
    const newStudent = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      birthday,
      department: "SD Department", // Fixed department
      program: selectedProgram, // Program selected by the user
      username,
      password,
      retypePassword,
    };

    signup(newStudent).then((result) => {
      setAlertMessage(result.response.message);
      if (result.status < 300) {
        setTypeAlert("sucess");
        // Redirect to Login page after successful sign-up
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setTypeAlert("alert");
      }
      setShowMessage(true);
    });

  };
  const hideMessage = () => {
    setShowMessage(false);
  };

  if (isLoading) return <div> Loading . . .</div>;
  return (
    <div>
      {showMessage ? (
        <Alert
          showMessage={showMessage}
          message={alertMessage}
          onClick={hideMessage}
          type={typeAlert}
        />
      ) : null}
      <div
      className="flex items-center flex-col container mx-auto my-2 p-5 bg-gray-50 shadow-lg min-h-[55vh] rounded-xl max-w-[400px] border border-solid border-gray-300"
      >
        <h2 className="text-center mb-5">Student Sign Up</h2>
        <form onSubmit={handleSubmit} 
        className="flex flex-col">

          <div>
            <label>First Name</label>
            <input
              className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-3 focus:shadow-lg"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Last Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-3 focus:shadow-lg"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>email</label>
            <input
              className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-3 focus:shadow-lg"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Phone</label>
            <input
              ref={inputRef}
              type="tel"
              className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-3 focus:shadow-lg"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Birthday</label>
            <input
              className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-3 focus:shadow-lg"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              max={new Intl.DateTimeFormat("en-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).format(new Date())}
              min={new Intl.DateTimeFormat("en-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).format(new Date()-3155760000000)}
              required
            />
          </div>

          <div>
            <label>Program</label>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-3 focus:shadow-lg"
            >
              {allPrograms.map((program) => (
                <option key={program.programcode} value={program.programcode}>
                  {program.programname}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Username</label>
            <input
              className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-3 focus:shadow-lg"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-3 focus:shadow-lg"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-3 focus:shadow-lg"
              type="password"
              placeholder="Confirm Password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Department</label>
            <input
              type="text"
              value="SD Department"
              readOnly
              className="w-full p-3 rounded-lg border border-solid border-gray-300 mb-3 focus:shadow-lg"
            />
          </div>

          <button
            type="submit"
            className={`text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color1)] border-solid border-2 border-[var(--color1)] hover:text-[var(--color1)] hover:bg-white focus:shadow-lg`}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};