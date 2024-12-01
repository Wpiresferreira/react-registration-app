import { useEffect, useState } from "react";
import MyCourses from "../components/MyCourses";
import AddCourses from "../components/AddCourses";
import { getCourses, getEnrollments, getLoggedUser, getTerms } from "../data/api";

export default function Registration() {
  const [loggedUser, setLoggedUser] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  const [allTerms, setAllTerms] = useState();
  const [myEnrollments, setMyEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const tempLoggedUser = await getLoggedUser();
      setLoggedUser(tempLoggedUser.response);
      const tempTerms = await getTerms();
      setAllTerms(await tempTerms.response);
      
    }
    getData();
  }, []);

  useEffect(() => {
    if (!loggedUser) return;

    async function getData(){
      const tempAllCourses = await getCourses(loggedUser.program)
      setAllCourses(tempAllCourses.response)
      const enrollments = await getEnrollments(loggedUser.userid);
      setMyEnrollments(enrollments.response)
    }
    getData();
    setIsLoading(false)
  }, [loggedUser]);

  const [selectedTab, setSetectedTab] = useState("My");

  async function updateAllEnrollments() {
    console.log('update called')
    const enrollments = await getEnrollments(loggedUser.userid);
    setMyEnrollments(enrollments.response)
  }

  const handleOnClickTab = (e) => {
    setSetectedTab(e.target.innerText.split(" ")[0]);
  };

  if (!loggedUser || loggedUser.isadmin) return (<div></div>);
  if (isLoading) return <h1>Loading . . . </h1>;

  return (
    <>
      <div
        className="mt-2 flex flex-col items-center justify-center
    "
      >
        <div className="font-bold m-4 text-2xl">
          {"Student: " +
            loggedUser.first_name +
            " " +
            loggedUser.last_name
            +
            " / " +
            loggedUser.programname
            }
        </div>
        <div className="w-[90vw] min-h-[70vh]">
          <div className="flex">
            <button
              onClick={handleOnClickTab}
              className={` ${
                selectedTab === "My"
                  ? "bg-sky-400  font-bold"
                  : "bg-sky-200"
              } grow h-12 rounded-t-2xl`}
            >
              {`My Courses (${myEnrollments.length}/${allCourses.length})`}
            </button>
            <button
              onClick={handleOnClickTab}
              className={` ${
                selectedTab === "Add"
                  ? "bg-sky-400 font-bold"
                  : "bg-sky-200"
              } grow h-12 rounded-t-2xl`}
            >
              {`Add Courses (${allCourses.length -myEnrollments.length}/${allCourses.length})`}
            </button>
          </div>
          {selectedTab === "My" ? (
            <MyCourses
              loggedUser={loggedUser}
              allCourses={allCourses}
              myEnrollments={myEnrollments}
              allTerms={allTerms}
              updateAllEnrollments = {updateAllEnrollments}
            />
          ) : (
            <AddCourses
              loggedUser={loggedUser}
              allCourses={allCourses}
              myEnrollments={myEnrollments}
              allTerms={allTerms}
              updateAllEnrollments = {updateAllEnrollments}

            />
          )}
        </div>
      </div>
    </>
  );
}
