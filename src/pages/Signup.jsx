import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPrograms, signup } from "../data/api";
import Alert from "../components/Alert";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [error, setError] = useState(null);
  const [allPrograms, setAllPrograms] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("")
  const [showMessage, setShowMessage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const allPrograms = await getPrograms("");
      setAllPrograms(allPrograms);
      console.log(allPrograms)
      setSelectedProgram(allPrograms[0].programcode);
      setIsLoading(false);
    }
    getData();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new student object
    const newStudent = {
      first_name : firstName,
      last_name : lastName,
      email,
      phone,
      birthday,
      department: "SD Department", // Fixed department
      program : selectedProgram, // Program selected by the user
      username,
      password
    };

    signup(newStudent).then((result) => {
      setAlertMessage(result.message);
      setTypeAlert(result.type)
      setShowMessage(true);
      console.log(result);

      if(result.type === 'sucess'){
        setTimeout(() => {
          navigate("/login");
          
        }, 2000);
      }
    });

    // Redirect to Login page after successful sign-up
    // alert("User registered successfully!");
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
      <div style={styles.container}>
        <h2 style={styles.title}>Student Sign Up</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.formGroup}>
            <label>First Name:</label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Last Name:</label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Phone:</label>
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Birthday:</label>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Program:</label>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              required
              style={styles.input}
            >
              {allPrograms.map((program) => (
                <option key={program.programcode} value={program.programcode}>
                  {program.programname}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>Username:</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Password:</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Department:</label>
            <input
              type="text"
              value="SD Department"
              readOnly
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

// Basic inline styling
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: "15px",
  },
};

export default SignUp;
