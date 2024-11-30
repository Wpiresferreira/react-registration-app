import { formatDate } from "../data/util";

export default function Dashboard({loggedUser}){
  return (
    <div className="w-[50vw] min-h-[55vh] flex flex-col  items-center shadow-balanced mt-10 mx-auto">
      <div className="w-[50vw] bg-blue-100 ">
        <h1 className="flex flex-col items-center text-2xl text-blue-900 font-semibold  mb-4 mt-6">
          Dashboard - {loggedUser.isadmin ? "Administrator" : "Student"}
        </h1>
        <h2 className="flex flex-col items-center text-xl  text-blue-900 mb-8">
          Welcome, {loggedUser.first_name}!
        </h2>
      </div>

      <ul className=" flex flex-col justify-center items-left list-none   pt-1 ">
        <li className="mb-2">
          Full Name: {loggedUser.first_name} {loggedUser.last_name}
        </li>
        <li className="mb-2">Email: {loggedUser.email}</li>
        <li className="mb-2">Phone: {loggedUser.phone}</li>
        <li className="mb-2">Birthday: {formatDate(loggedUser.birthday)}</li>
        {/* Conditionally render Department and Program */}
        {!loggedUser.isadmin && (
          <>
            <li className="mb-2">Department: {loggedUser.department}</li>
            <li className="mb-2">Program: {loggedUser.program}</li>
          </>
        )}
        <li className="mb-2">Username: {loggedUser.username}</li>
      </ul>
    </div>
  );
}
