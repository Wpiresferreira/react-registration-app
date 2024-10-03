import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedUser } from "../data/util";

const Home = () => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState("");
  useEffect(() => {
    if (!sessionStorage.getItem("sessionId")) {
      return;
    }
    setLoggedUser(
      getLoggedUser(JSON.parse(sessionStorage.getItem("sessionId")).sessionId)
    );
  }, [loggedUser, navigate]);

  return !loggedUser ? (
    <div className="flex mt-12 justify-center">
      <div className=" h-[50vh] w-[80vw]">
      {/* <div className=" h-[50vh] w-[80vw] border-solid border-[var(--color1)] border-2"> */}
        <div className="text-center p-10 text-3xl font-bold">
          Welcome to Bow Valley Course Registration Page !
        </div>
        <div>Here you can:</div>
        <ul>
          <li className="p-4 ml-4">Meet our Programs and Courses</li>
          <li className="p-4 ml-4">Sign Up for a program</li>
          <li className="p-4 ml-4">Once you are registered in a Program, you are able to register for courses.</li>
        </ul>
        <div className="p-4 mr-4 text-right">Enjoy it!</div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-start items-start">
      <h1>Dashboard: Displays information such as first name, student/admin</h1>
      <h1> Welcome {loggedUser.firstName}, </h1>
    </div>
  );
};

export default Home;
