export default function Page() {
  return (
    <div className="flex items-center justify-center">
      <form className=" rounded-lg flex flex-col w-[80vw] bg-sky-100 items-center">
        <div className="m-4 text-2xl font-bold">Login</div>
        <label htmlFor="username">
          Username
          <input
            name="username"
            type="email"
            className="m-2 border-2 border-solid border-blue-950 rounded-md"
          ></input>
        </label>
        <label htmlFor="password">
          Password
          <input
            name="passwordusername"
            type="password"
            className="m-2 border-2 border-solid border-blue-950 rounded-md"
          ></input>
        </label>
        <div>
          <button
            className="w-36 h-11 rounded-lg m-2 bg-sky-400 hover:bg-sky-900 text-white"
            type="submit"
          >
            {" "}
            Sign Up{" "}
          </button>
          <button
            className="w-36 h-11 rounded-lg m-2 bg-sky-950 over:bg-sky-900 text-white"
            type="submit"
          >
            {" "}
            Login{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
