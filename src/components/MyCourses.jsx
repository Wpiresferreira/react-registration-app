import { useEffect, useState } from "react";
import {
  dropCourse,
  getMyCoursesByTerm,
  getMyTermsId,
  getTermDescription,
} from "../data/util";

export default function MyCourses({ loggedUser }) {
  const [myTermsId, setMyTermsId] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    setMyTermsId(getMyTermsId(loggedUser.userId));
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
    // for (let i = 0; i < getMyTermsId(loggedUser.userId); i++) {
    //   let count = getMyCoursesByTerm(
    //     loggedUser.userId,
    //     getMyTermsId(loggedUser.userId)
    //   )[i].length;
    //   for (
    //     let j;
    //     j <
    //     getMyCoursesByTerm(loggedUser.userId, getMyTermsId(loggedUser.userId))
    //       .length;
    //     j++
    //   ) {
    //     for (let k = 0; k < selectedCourses.length; k++) {
    //       if (
    //         selectedCourses[k].includes(
    //           getMyCoursesByTerm(
    //             loggedUser.userId,
    //             getMyTermsId(loggedUser.userId)
    //           )[k]
    //         )
    //       ) {
    //         count--;
    //       }
    //     }
    //   }
    //   if (count < 2 && count != 0) {
    //     alert("You cannot course less than 2 courses per term");
    //     return;
    //   }
    // }
      dropCourse(loggedUser.userId, selectedCourses);


    setSelectedCourses([]);
  };

  if (myTermsId.length === 0) {
    return <div>No courses enrolled yet!</div>;
  }
  return (
    <div className=" flex flex-col bg-sky-400">
      {myTermsId.map((termId, index) => (
        <div key={termId} className="font-bold p-2">
          {getTermDescription(termId)}
          <div className="flex">
            {getMyCoursesByTerm(loggedUser.userId, termId).map(
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
                    {course.courseDescription}
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
        Drop Selected Courses
      </button>
    </div>
  );
}
