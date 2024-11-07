import { Link, useNavigate } from "react-router-dom";
import logo from "../images/Logo.svg";
import logoMobile from "../images/Logo_Mobile.svg";
import { useEffect, useState } from "react";
import { getLoggedUser } from "../data/api";

export default function Top() {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState(null); // Initialize to null
  const [isLoading, setIsLoading] = useState(true); // control state loading bar

  useEffect(() => {
    async function getData() {
      const user = await getLoggedUser(sessionStorage.getItem("sessionId"));
      setLoggedUser(user);
      setIsLoading(false);
    }
    getData();
  }, [navigate]);

  function handleLogoff() {
    sessionStorage.clear();
    navigate("/logout");
    setLoggedUser(null);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-between w-[100vw] text-center bg-white shadow-[0px_12px_12px_-6px_rgba(3,26,98,0.16)]">
      <div className="flex justify-around items-center">
        <div className="hidden md:flex">
          <img
            className="ml-7 h-[80%] w-[80%] object-contain"
            src={logo}
            alt="logo"
          />
        </div>
        <div className="flex md:hidden h-24 w-24">
          <img
            className="h-[100%] w-[100%] object-contain"
            src={logoMobile}
            alt="logo"
          />
        </div>
        <div className="grow h-[100px] leading-[100px] text-ellipsis text-2xl font-bold">
          Course Registration
        </div>

        <button
          onClick={() => navigate("/signup")} // Redirect to SignUp page
          className={`${
            loggedUser ? "hidden" : null
          } text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
        >
          Sign up
        </button>
        <button
          onClick={() => navigate("/login")}
          className={`${
            loggedUser ? "hidden" : null
          } text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
        >
          Login
        </button>
        <button
          onClick={() => navigate("/profile")}
          className={`${
            loggedUser ? null : "hidden"
          } fa  fa-user text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
        ></button>
        <button
          onClick={handleLogoff}
          className={`${
            loggedUser ? null : "hidden"
          } fa  fa-power-off text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
        ></button>
      </div>

      <nav>
        <ul className="flex w-[100vw]">
          <li className="relative inline-block grow text-white text-center bg-[var(--color1)]">
            <div></div>
          </li>
          <li className="relative inline-block grow text-white text-center bg-[var(--color1)] hover:bg-[var(--color2)]">
            <Link className="block py-3" to="/">
              Home
            </Link>
          </li>
          <li className="relative inline-block grow text-white text-center bg-[var(--color1)] hover:bg-[var(--color2)]">
            <Link className="block py-3" to="/programs">
              Programs
            </Link>
          </li>
          <li
            className={`${
              !loggedUser || loggedUser.isadmin ? "hidden" : null
            } relative inline-block grow text-white text-center bg-[var(--color1)] hover:bg-[var(--color2)]`}
          >
            <Link className="block py-3" to="/registration">
              Registration
            </Link>
          </li>
          <li
            className={`${
              loggedUser && loggedUser.isadmin ? null : "hidden"
            } relative inline-block grow text-white text-center bg-[var(--color1)] hover:bg-[var(--color2)]`}
          >
            <Link className="block py-3" to="/students">
              Students
            </Link>
          </li>
          <li
            className={`${
              !loggedUser ? "hidden" : null
            } relative inline-block grow text-white text-center bg-[var(--color1)] hover:bg-[var(--color2)]`}
          >
            <Link className="block py-3" to="/contact">
              Contact
            </Link>
          </li>
          <li className="relative inline-block grow text-white text-center bg-[var(--color1)]">
            <div></div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
