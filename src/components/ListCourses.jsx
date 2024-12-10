import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEnrollments } from "../data/api";

export default function ListCourses({ studentId, studentObj }) {
  const navigate = useNavigate();
  const [studentTerms, setStudentTerms] = useState();
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const tmpEnrollments = await getEnrollments(studentId);
      setEnrollments(tmpEnrollments.response);
    }
    getData();
  }, [studentId]);
  
  useEffect(() => {
    if (enrollments.length > 0) {
      const sortedEnrollment = enrollments.sort((a,b)=> a.term_id-b.term_id)
      const tmpTerms = sortedEnrollment.reduce((acum, cur) => {
        if (!acum.includes(cur.term_description)) {
          acum.push(cur.term_description);
        }
        return acum;
      }, []);
      setStudentTerms(tmpTerms.sort((a,b)=> a.term_id<b.term_id));
      setIsLoading(false);
    }else{
      setIsLoading(false);
    }
  }, [enrollments]);

  if (isLoading) return <h1>Loading. . . </h1>;

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex items-start mb-4 w-[90vw]">
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className={`fa fa-arrow-left text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
        >
        </button>
      </div>
      <div className="flex flex-col w-[90vw] bg-sky-200 min-h-[50vh] rounded-2xl ">
        <div className="m-3 p-3 font-bold">
          {enrollments.length === 0
            ? null
            : "Student : " +
              enrollments[0].first_name +
              " " +
              enrollments[0].last_name}
        </div>
        {!enrollments || enrollments.length === 0 ? (
          <div className="p-3 m-3">No courses registered</div>
        ) : (!studentTerms?null :
          studentTerms.map((term, index) => (
            <div key={term} className="font-bold p-2">
              {term}
              <div className="flex flex-wrap flex-[0_0_18%]">
                {enrollments.filter((e)=>e.term_description === term).map((course, index) => (
                  <div
                    key={course.coursecode}
                    id={course.coursecode + "_container"}
                    className={`bg-white m-2 border-solid border-2 border-[--color1]  h-28 w-48 rounded-md`}
                  >
                    <div
                      id={course.coursecode + "_courseCode"}
                      className="p-2 text-center font-bold"
                    >
                      {course.coursecode}
                    </div>
                    <div
                      className="text-center text-sm"
                      id={course.coursecode + "_courseDescription"}
                    >
                      {course.coursename}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
