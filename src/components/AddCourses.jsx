import { useEffect, useState } from "react";
import { registerCourse } from "../data/api";

export default function AddCourses({ allCourses, myEnrollments, allTerms, updateAllEnrollments }) {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTerm, setSelectedTerm] = useState();

  useEffect(() => {
    if(allTerms) {
      setSelectedTerm(allTerms[0])
      setIsLoading(false)}

  }, [allTerms]);

  function isRegistered(courseCode){

    for(let i=0; i<myEnrollments.length; i++){
      if(courseCode === myEnrollments[i].coursecode){
        return true;
      }
    }
    return false;
  }

  const handleOnChangeSelection = (e) => {
    console.log(e.target.value)
    console.log(allTerms)
    const tempSelectedTerm = allTerms.filter(
      (t) => t.term_id === Number(e.target.value)
    )[0];
    setSelectedTerm(tempSelectedTerm);
    setSelectedCourses([])
  };

  const handleOnClickCourse = (e) => {
    //Toggle select / deselect course when it is clicked
    // Uptading status selectedCourses
    if (!selectedCourses.includes(e.target.closest("li").id)) {
      setSelectedCourses([...selectedCourses, e.target.closest("li").id]);
    } else {
      const tempIndex = selectedCourses.indexOf(e.target.closest("li").id);
      const tempSelectedCourses = [...selectedCourses];
      tempSelectedCourses.splice(tempIndex, 1);
      setSelectedCourses(tempSelectedCourses);
    }
  };

  async function buttonAddClick(e){
    console.log(selectedCourses)

    if (
      selectedCourses.length +
        myEnrollments.filter((e)=>e.term_id === selectedTerm.term_id).length <2) {
      alert("For each Term, you must be enrolled in at least 2 courses");
      return;
    }
    else if (
      selectedCourses.length +
      myEnrollments.filter((e)=>e.term_id === selectedTerm.term_id).length >
      5
    ) {
      alert("For each Term, you must be enrolled at maximum 5 courses");
      return;
    }
     for (let i = 0; i < selectedCourses.length; i++) {
       await registerCourse(selectedTerm.term_id, selectedCourses[i]);
     }
     setSelectedCourses([]);
     updateAllEnrollments()
  };

  if (isLoading) return <h1>Loading. . .</h1>;
  return (
    <div className=" flex flex-col bg-sky-400">
      <div>
        <label htmlFor="terms">Choose a Term:</label>

        <select name="terms" id="terms" default={allTerms[0].term_season + " / " + allTerms[0].term_year} onChange={handleOnChangeSelection}>
          {!allTerms
            ? null
            : allTerms.map((term) => (
                <option key={term.term_id} value={term.term_id}>
                  {term.term_season + " / " + term.term_year}
                </option>
              ))}
        </select>
      </div>

      <ul className="flex flex-wrap flex-[0_0_18%]">
        {allCourses.filter((course) =>
          course.availability.includes(selectedTerm.term_season)
        ).length === 0 ? (
          <li>
            No courses offered for this term<br></br>
            Or you are already registered for all this term courses
          </li>
        ) : (
          allCourses
            .filter((course) =>
              course.availability.includes(selectedTerm.term_season)
            && !isRegistered(course.coursecode)
            )
            .map((course, index) =>
               (
                <li
                  key={course.coursecode}
                  id={course.coursecode}
                  onClick={handleOnClickCourse}
                  className={` ${
                    selectedCourses.includes(course.coursecode)
                      ? "bg-green-400"
                      : "bg-white"
                  } flex flex-col  m-2 border-solid border-2 border-[--color1]  h-28 w-48 rounded-md`}
                >
                  <div
                    id={course.courseCode + "_coursecode"}
                    className="p-2 text-center font-bold"
                  >
                    {course.coursecode}
                  </div>
                  <div
                    className="text-center text-sm"
                    id={course.coursecode + "_coursename"}
                  >
                    {course.coursename}
                  </div>
                </li>
              )
            )
        )}
      </ul>
      <button
        onClick={buttonAddClick}
        className={` self-end text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
      >
        Add Selected Courses
      </button>
    </div>
  );
}
