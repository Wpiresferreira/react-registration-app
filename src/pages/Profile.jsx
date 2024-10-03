import { useEffect, useState } from "react";
import { getLoggedUser } from "../data/util";

const Home = () => {
  const [loggedUser, setLoggedUser] = useState("");

  useEffect(() => {
    setLoggedUser(
      getLoggedUser(JSON.parse(sessionStorage.getItem("sessionId")).sessionId)
    );
  }, []);

  return (
    <div className="flex flex-col justify-start items-start">
      <h1>
        View Profile: Students and Admins can view their profile information.
      </h1>
      <h1> Welcome {loggedUser.firstName}, </h1>
    </div>
  );
};

export default Home;
