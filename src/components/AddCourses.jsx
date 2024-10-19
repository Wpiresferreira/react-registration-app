import { useEffect, useState } from "react";
import {
  enrollCourse,
  getMyCoursesCode,
  getMyCoursesCodeByTerm,
  getQtRemainingCourses,
  getRemainingCourses,
  getTerms,
} from "../data/util";

export default function AddCourses({ loggedUser }) {
  const terms = getTerms();
  const [selectedTerm, setSelectedTerm] = useState(terms[0]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [coursesInBasket, setCoursesInBasket] = useState([]);
  const [qtRemainingCourses, setQtRemainingCourses] = useState(getQtRemainingCourses(loggedUser))
  const allCourses = getRemainingCourses(loggedUser);

  useEffect(() => {
    setQtRemainingCourses(getQtRemainingCourses(loggedUser))
  }, [coursesInBasket, loggedUser, selectedCourses]);

  const handleOnChangeSelection = (e) => {
    const tempSelectedTerm = terms.filter(
      (t) => t.termId === Number(e.target.value)
    )[0];
    setSelectedTerm(tempSelectedTerm);
    setCoursesInBasket([]);
  };

  const handleOnClickCourse = (e) => {
    // Checking if user is already registered for the clicked course
    if (
      getMyCoursesCodeByTerm(loggedUser.userId, selectedTerm.termId).includes(
        e.target.id.split("_")[0]
      )
    ) {
      alert("You are already enrolled for this Course");
      return;
    }

    //Toggle select / deselect course when it is clicked
    // Uptading status selectedCourses
    if (!selectedCourses.includes(e.target.id.split("_")[0])) {
      setSelectedCourses([...selectedCourses, e.target.id.split("_")[0]]);
    } else {
      const tempIndex = selectedCourses.indexOf(e.target.id.split("_")[0]);
      const tempSelectedCourses = [...selectedCourses];
      tempSelectedCourses.splice(tempIndex, 1);
      setSelectedCourses(tempSelectedCourses);
    }
  };

  const buttonAddClick = (e) => {
    if (
      selectedCourses.length +
        getMyCoursesCodeByTerm(loggedUser.userId, selectedTerm.termId).length <
      2
    ) {
      alert("For each Term, you must be enrolled in at least 2 courses");
      return;
    } else if (
      selectedCourses.length +
        getMyCoursesCodeByTerm(loggedUser.userId, selectedTerm.termId).length >
      5
    ) {
      alert("For each Term, you must be enrolled at maximum 5 courses");
      return;
    }

    for (let i = 0; i < selectedCourses.length; i++) {
      enrollCourse(loggedUser.userId, selectedTerm.termId, selectedCourses[i]);
    }
    setSelectedCourses([]);
  };

  return (
    <div className=" flex flex-col bg-sky-400">
      <div className="p-4 font-bold">Total Remaing Courses {qtRemainingCourses}</div>

      <div>
        <label htmlFor="terms">Choose a Term:</label>

        <select name="terms" id="terms" onChange={handleOnChangeSelection}>
          {terms.map((term) => (
            <option key={term.termId} value={term.termId}>
              {term.termSeason + " / " + term.termYear}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap flex-[0_0_18%]">
        {!allCourses.filter((course) =>
          course.availability.includes(selectedTerm.termSeason)
        ).length > 0 ? (
          <div>No courses offered for this term<br></br>
          Or you are already registered for all this term courses</div>
        ) : (
          allCourses
            .filter((course) =>
              course.availability.includes(selectedTerm.termSeason)
            )
            .map((course, index) => (
              getMyCoursesCode(loggedUser.userId).includes(course.courseCode)?
              null :
              <div
                key={course.courseCode}
                id={course.courseCode + "_container"}
                onClick={handleOnClickCourse}
                className={` ${
                  selectedCourses.includes(course.courseCode)
                    ? "bg-green-400"
                    : "bg-white"
                } flex flex-col  m-2 border-solid border-2 border-[--color1]  h-28 w-48 rounded-md`}
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
            ))
        )}
      </div>
      <button
        onClick={buttonAddClick}
        className={` self-end text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
      >
        Add Selected Courses
      </button>
    </div>
  );
}
