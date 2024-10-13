import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedUser, getProgramDescription, getUserByUserId } from "../data/util";
import MyCourses from "../components/MyCourses";
import AddCourses from "../components/AddCourses";

export default function Registration() {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState("");
  const [programName, setProgramName] = useState("");


  useEffect(() => {
    if (!sessionStorage.getItem("sessionId")) {
      return;
    }
    const tempLoggedUserId = getLoggedUser(JSON.parse(sessionStorage.getItem("sessionId")).sessionId)
    const tempLoggedUser = getUserByUserId(tempLoggedUserId)
    
    setLoggedUser(
      tempLoggedUserId
    );
  }, [navigate]);


  useEffect(()=>{
    const tempProgramName = getProgramDescription(loggedUser.program)
    if(loggedUser) {
      setProgramName(tempProgramName)}
  },[loggedUser])

  const [selectedTab, setSetectedTab] = useState("My Courses");

  const handleOnClickTab = (e) => {
    setSetectedTab(e.target.innerText);
  };

  return (
    <>
      <div
        className="mt-2 flex flex-col items-center justify-center
    "
      >
      <div className="font-bold m-4 text-2xl">
        {programName}
      </div>
        <div className="w-[90vw] min-h-[70vh]">
          <div className="flex">
            <button
              onClick={handleOnClickTab}
              className={` ${
                selectedTab === "My Courses"
                  ? "bg-sky-400  font-bold"
                  : "bg-sky-200"
              } grow h-12 rounded-t-2xl`}
            >
              My Courses
            </button>
            <button
              onClick={handleOnClickTab}
              className={` ${
                selectedTab === "Add Courses"
                  ? "bg-sky-400 font-bold"
                  : "bg-sky-200"
              } grow h-12 rounded-t-2xl`}
            >
              Add Courses
            </button>
          </div>
          {selectedTab === "My Courses" ? (
            <MyCourses loggedUser={loggedUser} />
          ) : (
            <AddCourses loggedUser={loggedUser} />
          )}
        </div>
      </div>
    </>
  );
}
