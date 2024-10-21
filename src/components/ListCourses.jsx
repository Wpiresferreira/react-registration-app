import { useEffect, useState } from "react";
import { getMyCoursesByTerm, getMyTermsId, getTermDescription } from "../data/util";
import { useNavigate } from "react-router-dom";

export default function ListCourses({ studentObj }) {
  const navigate = useNavigate()
  const [studentTerms, setStudentTerms] = useState();

  useEffect(() => {
    if (studentObj) {
      setStudentTerms(getMyTermsId(studentObj.userId));
    }
  }, [studentObj]);
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex items-start mb-4 w-[90vw]">
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200 px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
      <div className="flex flex-col w-[90vw] bg-sky-200 min-h-[50vh] rounded-2xl ">
        <div className="m-3 p-3 font-bold">{!studentObj ? null : "Student : " +
        studentObj.firstName +" "+
        studentObj.lastName }</div>
        {!studentTerms|| studentTerms.length === 0 ?<div className="p-3 m-3">No courses registered</div> :studentTerms.map((termId, index) => (
          <div key={termId} className="font-bold p-2">
            {getTermDescription(termId)}
            <div className="flex flex-wrap flex-[0_0_18%]">
              {getMyCoursesByTerm(studentObj, termId).map(
                (course, index) => (
                  <div
                    key={course.courseCode}
                    id={course.courseCode + "_container"}
                    className={` bg-white m-2 border-solid border-2 border-[--color1]  h-28 w-48 rounded-md`}
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
      </div>
    </div>
  );
}
