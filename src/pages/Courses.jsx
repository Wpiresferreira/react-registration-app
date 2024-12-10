import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteCourse,
  getCourses,
  getLoggedUser,
  getPrograms,
} from "../data/api";
import BoxCourse from "../components/BoxCourse";
import AddEditFormCourse from "../components/AddEditFormCourse";
import Alert from "../components/Alert";

export default function Courses() {
  const [loggedUser, setLoggedUser] = useState();
  const [program, setProgram] = useState();
  const [selectedCourse, setSelectedCourse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { programCode } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState();
  const [coursesFiltered, setCoursesFiltered] = useState();
  const [terms, setTerms] = useState();
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [view, setView] = useState("list"); // Modes are 'add', edit or add
  const [alertMessage, setAlertMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    async function getData() {
      const res = await getLoggedUser();
      setLoggedUser(res.response);
      const coursesByProgram = await getCourses(programCode);
      setCourses(coursesByProgram.response);
      const tmpProgram = (await getPrograms()).filter(
        (p) => p.programcode === programCode
      )[0];
      setProgram(tmpProgram);
    }
    getData();
    setIsLoading(false);
  }, [programCode]);

  useEffect(() => {
    if (courses) {
      setCoursesFiltered(
        courses.filter((course) => {
          return (
            course.coursecode
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            course.coursename.toLowerCase().includes(searchQuery.toLowerCase())
          );
        })
      );

      var tempTerms = [];
      courses.forEach((course) => {
        if (!tempTerms.includes(course.term)) {
          tempTerms = [...tempTerms, course.term];
        }
      });
      setTerms(tempTerms);
      setIsLoading(false);
    }
  }, [courses, searchQuery]);

  async function updateCourses() {
    const updatedCourses = await getCourses(programCode);
    setCourses(updatedCourses.response);
  }

  function handleEditCourse(e) {
    setView("edit");
    setSelectedCourse(courses.filter((course) => course.coursecode === e)[0]);
  }

  async function action(e) {
    var result;
    if (e.currentTarget.id.split("-")[0] === "openEdit") {
      setView("edit");
      setSelectedCourse(
        courses.filter(
          (course) => course.coursecode === e.currentTarget.closest("li").id
        )[0]
      );
    } else if (e.currentTarget.id.split("-")[0] === "openAdd") {
      setSelectedCourse(null);
      setView("add");
    } else if (e.currentTarget.id.split("-")[0] === "delete") {
      console.log(e.currentTarget.closest("li").id);
      result = await deleteCourse(e.currentTarget.closest("li").id);
      setAlertMessage(result.response.message);
      setTypeAlert(result.status < 300 ? "sucess" : "alert");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
    await updateCourses();
  }

  if (isLoading) return <h1> Loading . . . </h1>;
  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {view !== "list" && (
        <AddEditFormCourse
          view={view}
          selectedCourse={selectedCourse}
          setView={setView}
          updateCourses={updateCourses}
          setTypeAlert={setTypeAlert}
          setAlertMessage={setAlertMessage}
          setShowMessage={setShowMessage}
        />
      )}
      {view === "list" ? (
        <>
          {/* //   Back Button */}
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate(-1)}
              className={`fa fa-arrow-left text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
            ></button>
            {loggedUser && loggedUser.isadmin && (
              <button
                onClick={action}
                id="openAdd"
                className={`text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color1)] border-solid border-2 border-[var(--color1)] hover:text-[var(--color1)] hover:bg-white`}
              >
                Add Course
              </button>
            )}
          </div>
          <h1 className="text-4xl font-extrabold text-blue-900 mb-8 text-center">
            {`Courses for ${program ? program.programname : null}`}
          </h1>

          {/* Search Bar */}
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Course Name or Code"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>

          {terms &&
            terms.map((term) => (
              <div key={term}>
                Term {term}
                <ul className="flex flex-wrap">
                  {coursesFiltered
                    .filter((course) => course.term === term)
                    .map((course) => (
                      <BoxCourse
                        course={course}
                        key={course.coursecode}
                        id={course.coursecode}
                        action={action}
                        isadmin={loggedUser ? loggedUser.isadmin : false}
                        handleEditCourse={handleEditCourse}
                      />
                    ))}
                </ul>
              </div>
            ))}
        </>
      ) : null}
      {showMessage ? (
        <>
          <Alert
            showMessage={showMessage}
            message={alertMessage}
            onClick={() => {
              setShowMessage(false);
            }}
            type={typeAlert}
          />
        </>
      ) : null}
    </div>
  );
}
