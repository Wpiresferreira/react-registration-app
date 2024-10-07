import { Link, useNavigate } from "react-router-dom";
import logo from "../images/Logo.svg";
import logoMobile from "../images/Logo_Mobile.svg";
import { useEffect, useState } from "react";
import { getLoggedUser } from "../data/util";

export default function Top() {
  const navigate = useNavigate();

  // Control State of the session
  const [roleLoggedUser, setRoleLoggedUser] = useState(null);

  useEffect(() => {
    if (!sessionStorage.getItem("sessionId")) {
      return;
    }

    let result = getLoggedUser(
      JSON.parse(sessionStorage.getItem("sessionId")).sessionId
    );

    if (!result) {
      setRoleLoggedUser(null);
    } else if (!result.isAdmin) {
      setRoleLoggedUser("student");
    } else if (result.isAdmin) {
      setRoleLoggedUser("admin");
    }
  }, [navigate, roleLoggedUser]);

  function handleLogoff() {
    sessionStorage.clear();
    navigate("/logout");
    setRoleLoggedUser(null);
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
            roleLoggedUser ? "hidden" : null
          } text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
        >
          Sign up
        </button>
        <button
          onClick={() => navigate("/login")}
          className={`${
            roleLoggedUser ? "hidden" : null
          } text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
        >
          Login
        </button>
        <button
          onClick={() => navigate("/profile")}
          className={`${
            roleLoggedUser ? null : "hidden"
          } fa  fa-user text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
        ></button>
        <button
          onClick={handleLogoff}
          className={`${
            roleLoggedUser ? null : "hidden"
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
              roleLoggedUser !== "student" ? "hidden" : null
            } relative inline-block grow text-white text-center bg-[var(--color1)] hover:bg-[var(--color2)]`}
          >
            <Link className="block py-3" to="/registration">
              Registration
            </Link>
          </li>
          <li
            className={`${
              roleLoggedUser === "admin" ? null : "hidden"
            } relative inline-block grow text-white text-center bg-[var(--color1)] hover:bg-[var(--color2)]`}
          >
            <Link className="block py-3" to="/students">
              Students
            </Link>
          </li>
          <li
            className={`${
              !roleLoggedUser ? "hidden" : null
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
