import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <div className="w-[600px] h-[300px] rounded-2xl items-center m-6 flex flex-col justify-around bg-[var(--color2)]">
        <div>Your session was closed</div>
        <div>
          <button
            onClick={() => navigate("/signup")} // Redirect to SignUp page
            className={` text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
          >
            Sign up
          </button>
          <button
            onClick={() => navigate("/login")}
            className={` text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
