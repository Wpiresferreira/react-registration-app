import { useEffect, useState } from "react";
import { dropCourse } from "../data/api";

export default function MyCourses({
  loggedUser,
  allCourses,
  myEnrollments,
  allTerms,
  updateAllEnrollments
}) {
  const [myTerms, setMyTerms] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  useEffect(() => {
    if (!loggedUser) {
      return;
    }
    const tempTerms = myEnrollments.reduce((acum, cur) => {
      if (!acum.includes(cur.term_description)) {
        acum.push(cur.term_description);
      }
      return acum;
    }, []);
    setMyTerms(tempTerms);
  }, [selectedCourses, loggedUser, myEnrollments]);

  const handleOnClickCourse = (e) => {
    console.log(e.target.closest("li").id);
    if (!selectedCourses.includes(e.target.closest("li").id)) {
      setSelectedCourses([...selectedCourses, e.target.closest("li").id]);
    } else {
      const tempIndex = selectedCourses.indexOf(e.target.closest("li").id);
      const tempSelectedCourses = [...selectedCourses];
      tempSelectedCourses.splice(tempIndex, 1);
      setSelectedCourses(tempSelectedCourses);
    }
  };

  async function buttonDropClick(e) {
    console.log(selectedCourses);

    var myEnrollmentsCopy = [...myEnrollments];

    selectedCourses.forEach((coursecode) => {
      myEnrollmentsCopy = myEnrollmentsCopy.filter(
        (enrolment) => enrolment.coursecode !== coursecode
      );
    });

    var qtCoursesPerTerm = [];
    allTerms.forEach((term) => {
      var qt = myEnrollmentsCopy.reduce((acum, cur) => {
        if (cur.term_id === term.term_id) {
          acum++;
        }
        return acum;
      }, 0);
      qtCoursesPerTerm.push(qt);
    });

   for(let i =0; i< qtCoursesPerTerm.length; i++){
      if (qtCoursesPerTerm[i] === 1) {
        alert("You must be enrolled at least 2 courses each term");
        return ;
      }
    }


    selectedCourses.forEach(async (courseCode)=>{
      await dropCourse(courseCode)
      setSelectedCourses([]);
      updateAllEnrollments()
    })

    // if (
    //   selectedCourses.length +
    //     myEnrollments.filter((e)=>e.term_id === selectedTerm.term_id).length <2) {
    //   alert("For each Term, you must be enrolled in at least 2 courses");
    //   return;
    // }

    // else if (
    //   selectedCourses.length +
    //   myEnrollments.filter((e)=>e.term_id === selectedTerm.term_id).length >
    //   5
    // ) {
    //   alert("For each Term, you must be enrolled at maximum 5 courses");
    //   return;
    // }
    //  for (let i = 0; i < selectedCourses.length; i++) {
    //    await registerCourse(selectedTerm.term_id, selectedCourses[i]);
    //  }
    //  setSelectedCourses([]);
    //  updateAllEnrollments()

    // dropCourse(loggedUser.userId, selectedCourses);

  }

  if (myTerms.length === 0) {
    return <div>No courses enrolled yet!</div>;
  }
  return (
    <div className=" flex flex-col bg-sky-400">
      {myTerms.map((termId, index) => (
        <div key={termId} className="font-bold p-2">
          {termId}
          {/* {getTermDescription(termId)} */}
          <ul className="flex flex-wrap flex-[0_0_18%]">
            {/* {!getMyCoursesByTerm(loggedUser, termId)
              ? null
              :}  */}
            {myEnrollments
              .filter((e) => e.term_description === termId)
              .map((course, index) => (
                <li
                  key={course.coursecode}
                  id={course.coursecode}
                  onClick={handleOnClickCourse}
                  className={` ${
                    selectedCourses.includes(course.coursecode)
                      ? "bg-red-400"
                      : "bg-white"
                  } m-2 border-solid border-2 border-[--color1]  h-28 w-48 rounded-md`}
                >
                  <div
                    id={course.courseCode + "_courseCode"}
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
                </li>
              ))}
          </ul>
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
