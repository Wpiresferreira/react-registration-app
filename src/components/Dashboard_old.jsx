// import { formatDate } from "../data/util";

// export default function Dashboard({ loggedUser }) {
//   if (!loggedUser) return <h1>Loading . . . </h1>;
//   const user = loggedUser.response;

//   return (
//     <div className="w-[50vw] min-h-[55vh] flex flex-col  items-center shadow-balanced mt-10 mx-auto">
//       <div className="w-[50vw] bg-blue-100 ">
//         <h1 className="flex flex-col items-center text-2xl text-blue-900 font-semibold  mb-4 mt-6">
//           Dashboard - {user.isadmin ? "Administrator" : "Student"}
//         </h1>
//         <h2 className="flex flex-col items-center text-xl  text-blue-900 mb-8">
//           Welcome, {user.first_name}!
//         </h2>
//       </div>

//       <ul className=" flex flex-col justify-center items-left list-none   pt-1 ">
//         <li className="mb-2">
//           Full Name: {user.first_name} {user.last_name}
//         </li>
//         <li className="mb-2">Email: {user.email}</li>
//         <li className="mb-2">Phone: {user.phone}</li>
//         <li className="mb-2">Birthday: {formatDate(user.birthday)}</li>
//         {/* Conditionally render Department and Program */}
//         {!user.isadmin && (
//           <>
//             <li className="mb-2">Department: {user.department}</li>
//             <li className="mb-2">Program: {user.program}</li>
//           </>
//         )}
//         <li className="mb-2">Username: {user.username}</li>
//       </ul>
//     </div>
//   );
// }
