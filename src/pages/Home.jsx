import { useEffect, useState } from "react";
import { getLoggedUser } from "../data/util";

const Home = () => {
  const [loggedUser, setLoggedUser] = useState(null); // Initialize to null

  useEffect(() => {
    const sessionId = JSON.parse(sessionStorage.getItem("sessionId"));

    console.log("Session ID retrieved:", sessionId);

    if (!sessionId) {
      return; // Exit if no sessionId is found
    }

    // Retrieve user information using the sessionId
    const user = getLoggedUser(sessionId.sessionId);
    
    console.log("User fetched:", user); // Debugging line

    // Check if user is valid
    if (user) {
      setLoggedUser(user);
    } else {
      console.error("User not found for the given session ID.");
    }
  }, []);


  return !loggedUser ? (
    <div className="flex mt-12 justify-center">
      <div className="h-[50vh] w-[80vw]">
        <div className="text-center p-10 text-3xl font-bold">
          Welcome to Bow Valley Course Registration Page!
        </div>
        <div>Here you can:</div>
        <ul>
          <li className="p-4 ml-4">Meet our Programs and Courses</li>
          <li className="p-4 ml-4">Sign Up for a program</li>
          <li className="p-4 ml-4">
            Once you are registered in a Program, you are able to register for courses.
          </li>
        </ul>
        <div className="p-4 mr-4 text-right">Enjoy it!</div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-start items-start p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <h2 className="text-xl mb-2">Welcome, {loggedUser.firstName}!</h2>
      <p className="mb-2">User Details:</p>
      <ul className="list-disc pl-5">
        <li>Full Name: {loggedUser.firstName} {loggedUser.lastName}</li>
        <li>Email: {loggedUser.email}</li>
        <li>Phone: {loggedUser.phone}</li>
        <li>Birthday: {loggedUser.birthday}</li>
        <li>Department: {loggedUser.department}</li>
        <li>Program: {loggedUser.program}</li>
        <li>Username: {loggedUser.username}</li>
      </ul>
    </div>
  );
};

export default Home;
