import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-evenly flex-col container mx-auto my-2 p-5 bg-gray-50 shadow-lg min-h-[55vh] rounded-xl max-w-[400px] border border-solid border-gray-300">
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
