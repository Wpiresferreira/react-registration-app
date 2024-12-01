import { useEffect, useState } from "react";
import { getLoggedUser } from "../data/api";
import Welcome from "../components/Welcome"
import Dashboard from "../components/Dashboard";

export default function Home() {
  
  const [loggedUser, setLoggedUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve user information using the cookie
    async function getData() {
      const res = await getLoggedUser();
      if(res.status>201) {
        setIsLoading(false);
        return
      }
      setIsLoading(false);
      setLoggedUser(res.response);
    }
    getData();
  }, []);
  
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
    {loggedUser ? <Dashboard loggedUser={loggedUser}/> : <Welcome />}
    </>
  );
}
