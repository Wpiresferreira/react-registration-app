import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import programs from "../data/programs"; // Import the programs data

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(programs[0].programCode); // Default to first program code
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const loadUsersFromLocalStorage = () => {
    // Retrieve users from localStorage
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  };

  const saveUsersToLocalStorage = (users) => {
    // Save updated users list to localStorage
    localStorage.setItem("users", JSON.stringify(users));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Load existing users from localStorage
    const users = loadUsersFromLocalStorage();

    // Check if the username or email is already taken
    const existingUser = users.find(
      (user) => user.username === username || user.email === email
    );

    if (existingUser) {
      setError("Username or Email already exists.");
      return;
    }

    // Generate Student ID
    const studentId = uuidv4();

    // Find the selected program details
    const programDetails = programs.find(program => program.programCode === selectedProgram);

    // Create a new student object
    const newStudent = {
      userId: studentId, // Student ID as userId
      firstName,
      lastName,
      email,
      phone,
      birthday,
      department: "SD Department", // Fixed department
      program: programDetails.programName, // Program selected by the user
      username,
      password,
      isAdmin: false, // Default to non-admin students
    };

    // Add the new student to the users array and save it to localStorage
    const updatedUsers = [...users, newStudent];
    saveUsersToLocalStorage(updatedUsers);

    // Redirect to Login page after successful sign-up
    alert("User registered successfully!");
    navigate("/login");
  };

  return (
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
            {programs.map((program) => (
              <option key={program.programCode} value={program.programCode}>
                {program.programName}
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
