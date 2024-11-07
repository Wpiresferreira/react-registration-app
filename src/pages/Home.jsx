import { useEffect, useState } from "react";
import { getLoggedUser } from "../data/api";
import Dashboard from "../components/Dashboard";

const Home = () => {
  const [loggedUser, setLoggedUser] = useState(null); // Initialize to null
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Retrieve user information using the sessionId
    async function getData() {
      const user = await getLoggedUser(sessionStorage.getItem("sessionId"));
      console.log(user)
      setLoggedUser(user);
      setIsLoading(false);
    }
    getData();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return !loggedUser ? (
    <div className="flex flex-col mt-2 justify-center items-center">
      <div className="min-h-[50vh] w-[80vw]">
        <div className=" text-center p-4 text-3xl font-bold">
          Welcome to Bow Valley Course Registration Page!
        </div>
        <div className="mb-5 text-xl w-[400px]">Here you can:</div>
        <ul className="shadow-balanced list-disc list-inside space-y-4 text-lg">
          <li className="p-1 ml-1 font-semibold">
            Meet our Programs and Courses
          </li>
          <li className="p-1 ml-1 font-semibold">Sign Up for a program</li>
          <li className="p-1 ml-1 font-semibold">
            Once you are registered in a Program, you are able to register for
            courses.
          </li>
        </ul>
        <div className="p-4 mr-4 text-right">Enjoy it!</div>
      </div>
    </div>
  ) : (
    <Dashboard loggedUser={loggedUser} />
  );
};

export default Home;
