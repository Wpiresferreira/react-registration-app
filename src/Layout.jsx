import { Outlet, useNavigate} from "react-router-dom";
import Top from "./components/Top";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { getLoggedUser } from "./data/util";

const Layout = () => {

  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState("");
  useEffect(() => {
    if (!sessionStorage.getItem("sessionId")) {
      return;
    }
    setLoggedUser(
      getLoggedUser (JSON.parse(sessionStorage.getItem("sessionId")).sessionId)
    );
  }, [loggedUser, navigate]);

  return (
    <main className="grid grid-rows-[auto_1fr_auto] min-h-[100vh]">
      <Top loggeduser={loggedUser}></Top>
      <Outlet context={[loggedUser]} />
      <Footer></Footer>
    </main>
  );
};

export default Layout;
