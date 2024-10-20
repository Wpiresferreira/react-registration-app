import { useEffect, useState } from "react";
import { getLoggedUser } from "../data/util";

const Home = () => {
  const [loggedUser, setLoggedUser] = useState(null); // Initialize to null

  useEffect(() => {
    const sessionId = JSON.parse(sessionStorage.getItem("sessionId"));
    if (!sessionId) {
      return; // Exit if no sessionId is found
    }

    // Retrieve user information using the sessionId
    const user = getLoggedUser(sessionId.sessionId);

    // Check if user is valid
    if (user) {
      setLoggedUser(user);
    } else {
      console.error("User not found for the given session ID.");
    }
  }, []);


  return !loggedUser ? (
    <div className="flex flex-col mt-2 justify-center items-center">
      <div className="min-h-[50vh] w-[80vw]">
        <div className=" text-center p-4 text-3xl font-bold">
          Welcome to Bow Valley Course Registration Page!
        </div>
        <div className="mb-5 text-xl w-[400px]">Here you can:</div>
        <ul className="shadow-balanced list-disc list-inside space-y-4 text-lg">
          <li className="p-1 ml-1 font-semibold">Meet our Programs and Courses</li>
          <li className="p-1 ml-1 font-semibold">Sign Up for a program</li>
          <li className="p-1 ml-1 font-semibold">
            Once you are registered in a Program, you are able to register for courses.
          </li>
        </ul>
        <div className="p-4 mr-4 text-right">Enjoy it!</div>
      </div>
    </div>
  ) :  (
    <div className="w-[50vw] min-h-[55vh] flex flex-col  items-center shadow-balanced mt-10 mx-auto">
      <div className="w-[50vw] bg-blue-100 ">

    <h1 className="flex flex-col items-center text-2xl text-blue-900 font-semibold  mb-4 mt-6">Dashboard - {loggedUser.isAdmin? "Administrator" : "Student"}</h1>
      <h2 className="flex flex-col items-center text-xl  text-blue-900 mb-8">Welcome, {loggedUser.firstName}!</h2>
    
      </div>
      
      <ul className=" flex flex-col justify-center items-left list-none   pt-1 ">
        <li className="mb-2">Full Name: {loggedUser.firstName} {loggedUser.lastName}</li>
        <li className="mb-2">Email: {loggedUser.email}</li>
        <li className="mb-2">Phone: {loggedUser.phone}</li>
        <li className="mb-2">Birthday: {loggedUser.birthday}</li>
        {/* Conditionally render Department and Program */}
        {!loggedUser.isAdmin && (
          <>
            <li className="mb-2">Department: {loggedUser.department}</li>
            <li className="mb-2">Program: {loggedUser.program}</li>
          </>
        )}
        <li className="mb-2">Username: {loggedUser.username}</li>
      </ul>
    </div>
  );
};

export default Home;
