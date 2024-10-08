import { useEffect, useState } from "react";
import { programs } from "../data/data";
import { getDepartmentById, getLoggedUser } from "../data/util";

const Programs = () => {
  
  const today = new Date();
  const [loggedUser, setLoggedUser] = useState("");
  useEffect(() => {
    if (!sessionStorage.getItem("sessionId")) {
      return;
    }
    setLoggedUser(
      getLoggedUser(JSON.parse(sessionStorage.getItem("sessionId")).sessionId)
    );
  }, []);
  
  
  return (
    <div className="flex flex-col">
      <h1>
        All users (including non-logged) can view all programs and courses
      </h1>
      <div className="mx-4 grid gap-1 grid-cols-[auto_auto_auto_auto_auto_auto_auto_auto_auto] bg-[--color1] text-[--color2]">
        <div className="bg-[--color1] text-[--color2] text-center py-4">Program</div>
        <div className="bg-[--color1] text-[--color2] text-center py-4">Department</div>
        <div className="bg-[--color1] text-[--color2] text-center py-4">Terms</div>
        <div className="bg-[--color1] text-[--color2] text-center py-4">Start Date</div>
        <div className="bg-[--color1] text-[--color2] text-center py-4">EndDate</div>
        <div className="bg-[--color1] text-[--color2] text-center py-4">Domestic Tuition</div>
        <div className="bg-[--color1] text-[--color2] text-center py-4">International Tuition</div>
        <div className="bg-[--color1] text-[--color2] text-center py-4">Registration</div>
        <div className="bg-[--color1] text-[--color2] text-center py-4">Actions</div>

        {programs.map((program) => {
          return (
            <>
              <div  className="bg-[--color2] text-[--color1] text-left py-4" key={program.programId}>{program.description}</div>
              <div  className="bg-[--color2] text-[--color1] text-left py-4">{getDepartmentById(program.departmentId)}</div>
              <div  className="bg-[--color2] text-[--color1] text-center py-4">{program.terms}</div>
              <div  className="bg-[--color2] text-[--color1] text-center py-4">{program.startDate}</div>
              <div  className="bg-[--color2] text-[--color1] text-center py-4">{program.endDate}</div>
              <div  className="bg-[--color2] text-[--color1] text-right py-4">
                {new Intl.NumberFormat("en-CA", {
                  style: "currency",
                  currency: "CAD",
                }).format(program.tuitionCan)}
              </div>
              <div  className="bg-[--color2] text-[--color1] text-right py-4">
                {program.tuitionInt ? new Intl.NumberFormat("en-CA", {
                  style: "currency",
                  currency: "CAD",
                }).format(program.tuitionInt): 'N/D'}
              </div>
              <div  className="bg-[--color2] text-[--color1] text-center py-4">
                {new Date(program.startRegister) < today.getTime() &&
                new Date(program.endRegister) > today.getTime()
                  ? "Open"
                  : "Closed"}
              </div>
              <div className="bg-[--color2] text-[--color1] text-center py-4">
                <button className="text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white">See Courses</button>
                {!loggedUser.isAdmin? null: <button className="text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white">Edit Program</button>}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Programs;
