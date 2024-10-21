import { useEffect, useState } from "react";
import {
  dropCourse,
  getMyCoursesByTerm,
  getMyTermsId,
  getQtCoursesRegistered,
  getTermDescription,
} from "../data/util";

export default function MyCourses({ loggedUser }) {
  const [myTermsId, setMyTermsId] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [qtMyCourses, setQtMyCourses] = useState();

  useEffect(() => {
    if (!loggedUser) {
      return;
    }
    setMyTermsId(getMyTermsId(loggedUser.userId).sort());
    setQtMyCourses(getQtCoursesRegistered(loggedUser));
  }, [selectedCourses, loggedUser]);

  const handleOnClickCourse = (e) => {
    console.log(e.target.id.split("_")[0]);
    if (!selectedCourses.includes(e.target.id.split("_")[0])) {
      setSelectedCourses([...selectedCourses, e.target.id.split("_")[0]]);
    } else {
      const tempIndex = selectedCourses.indexOf(e.target.id.split("_")[0]);
      const tempSelectedCourses = [...selectedCourses];
      tempSelectedCourses.splice(tempIndex, 1);
      setSelectedCourses(tempSelectedCourses);
    }
  };

  const buttonDropClick = (e) => {
    dropCourse(loggedUser.userId, selectedCourses);

    setSelectedCourses([]);
  };

  if (myTermsId.length === 0) {
    return <div>No courses enrolled yet!</div>;
  }
  return (
    <div className=" flex flex-col bg-sky-400">
      <div className="p-4 font-bold">
        Total Courses registered {qtMyCourses ? qtMyCourses : null}
      </div>
      {myTermsId.map((termId, index) => (
        <div key={termId} className="font-bold p-2">
          {getTermDescription(termId)}
          <div className="flex flex-wrap flex-[0_0_18%]">
            {!getMyCoursesByTerm(loggedUser, termId)?null:
            getMyCoursesByTerm(loggedUser, termId).map(
              (course, index) => (
                <div
                  key={course.courseCode}
                  id={course.courseCode + "_container"}
                  onClick={handleOnClickCourse}
                  className={` ${
                    selectedCourses.includes(course.courseCode)
                      ? "bg-red-400"
                      : "bg-white"
                  } m-2 border-solid border-2 border-[--color1]  h-28 w-48 rounded-md`}
                >
                  <div
                    id={course.courseCode + "_courseCode"}
                    className="p-2 text-center font-bold"
                  >
                    {course.courseCode}
                  </div>
                  <div
                    className="text-center text-sm"
                    id={course.courseCode + "_courseDescription"}
                  >
                    {course.name}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ))}
      <button
        onClick={buttonDropClick}
        className={` self-end text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
      >
        Drop Courses
      </button>
    </div>
  );
}
