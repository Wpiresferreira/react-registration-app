  import React, { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import programsData from "../data/programs";
  import { getLoggedUser } from "../data/util"; 
  import courses from "../data/courses";

  const Program = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [programs, setPrograms] = useState(() => {
      const storedPrograms = localStorage.getItem("programs");
      return storedPrograms ? JSON.parse(storedPrograms) : programsData;
    });
    const [formVisible, setFormVisible] = useState(false);
    const [programListVisible, setProgramListVisibility] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [programForm, setProgramForm] = useState({
      programCode: "",
      programName: "",
      description: "",
      duration: "",
      fees: { domestic: 0, international: 0 },
      startDate: "",
      endDate: "",
      term: "",
    });
    const [courses, setCourses] = useState(() => {
      const storedCourses = localStorage.getItem("courses");
      return storedCourses ? JSON.parse(storedCourses) : courses; 
    });
    const [courseForm, setCourseForm] = useState({
      courseCode: "",
      courseName: "",
      startDate: "",
      endDate: "",
      description: "",
    })
    useEffect(() => {
      const sessionId = JSON.parse(
        sessionStorage.getItem("sessionId")
      )?.sessionId;
      if (sessionId) {
        const loggedInUser = getLoggedUser(sessionId);
        setIsAdmin(loggedInUser?.isAdmin || false);
      }
    }, []);
    
    useEffect(() => {
      localStorage.setItem("programs", JSON.stringify(programs));
    }, [programs]);
    
    useEffect(() => {
      localStorage.setItem("courses", JSON.stringify(courses));
    }, [courses]);
    const handleEditProgram = (programCode) => {
      const programToEdit = programs.find((p) => p.programCode === programCode);
      setProgramForm({ ...programToEdit });
      setFormVisible(true);
      setProgramListVisibility(false);
      setEditMode(true);
      setCourses(
        Array.from({ length: programToEdit.duration }, () =>
          Array(3).fill({
            courseCode: "",
            courseName: "",
            startDate: "",
            endDate: "",
            description: "",
          })
        )
      );
    };

    const handleProgramClick = (programCode) => {
      navigate(`/courses/${programCode}`);
    };

    const handleAddProgram = () => {
      setFormVisible(true);
      setProgramListVisibility(false);
      setEditMode(false);
      setProgramForm({
        programCode: "",
        programName: "",
        description: "",
        duration: "",
        fees: { domestic: 0, international: 0 },
        startDate: "",
        endDate: "",
        term: "",
        courses: [],
      });
      setCourses(
        Array.from({ length: programForm.duration }, () =>
          Array(3).fill({
            courseCode: "",
            courseName: "",
            startDate: "",
            endDate: "",
            description: "",
          })
        )
      );
    };



    const handleDeleteProgram = (programCode) => {
      if (
        window.confirm(`Are you sure you want to delete program ${programCode}?`)
      ) {
        const updatedPrograms = programs.filter(
          (p) => p.programCode !== programCode
        );
        setPrograms(updatedPrograms);
        alert(`Program ${programCode} deleted successfully!`);
      }
    };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const updatedCourses = { ...courses };

    if (editMode) {
      const updatedPrograms = programsData.map((p) =>
        p.programCode === programForm.programCode
          ? { ...programForm }
          : p
      );
      updatedCourses[programForm.programCode] = {
        ...updatedCourses[programForm.programCode],
        terms: {
          ...updatedCourses[programForm.programCode].terms,
          ...courses
        }
      };

      setPrograms(updatedPrograms);
      setCourses(updatedCourses);
      alert("Program and courses updated successfully!");
    } else {
      setPrograms([...programsData, { ...programForm }]);
      setCourses({
        ...courses,
        [programForm.programCode]: {
          programName: programForm.programName,
          terms: courses  
        }
      });
      alert("Program and courses added successfully!");
    }
    
    setFormVisible(false);
    setProgramListVisibility(true); 
  };

    const handleCancel = () => {
      setFormVisible(false);
      setProgramListVisibility(true);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name.includes("fees")) {
        setProgramForm((prevState) => ({
          ...prevState,
          fees: {
            ...prevState.fees,
            [name.split(".")[1]]: parseFloat(value),
          },
        }));
      } else {
        setProgramForm({
          ...programForm,
          [name]: value,
        });
      }
    };

    const handleCourseChange = (e) => {
      const {name, value} = e.target;
      setCourses(...courses);

    };

    const addCourseForTerm = (termIndex) => {
      if (courses[termIndex].length >= 6) {
        alert("Cannot add more than 6 courses to this term.");
        return;
      }
      setCourses((prevCourses) => {
        const updatedCourses = [...prevCourses];
        const updatedTermCourses = [...(updatedCourses[termIndex] || [])];
        updatedTermCourses.push({
          courseCode: "",
          courseName: "",
          startDate: "",
          endDate: "",
          description: "",
        });
        updatedCourses[termIndex] = updatedTermCourses;
        return updatedCourses;
      });
    };

    return (
      <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-1000">
          Available Programs
        </h1>

        {isAdmin && (
          <div className="text-center mb-4">
            <button
              onClick={handleAddProgram}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Add Program
            </button>
          </div>
        )}

        {formVisible && (
          <form
            onSubmit={handleFormSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h2 className="text-2xl font-bold mb-4">
              {editMode ? "Edit Program" : "Add Program"}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Program Code
              </label>
              <input
                type="text"
                name="programCode"
                value={programForm.programCode}
                onChange={handleChange}
                disabled={editMode}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Program Name
              </label>
              <input
                type="text"
                name="programName"
                value={programForm.programName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={programForm.description}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            {/* <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Duration
              </label>
              <input
                type="number"
                name="duration"
                value={programForm.duration}
                onChange={handleChange}
                disabled={editMode} // Program duration shouldn't be editable during edit
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div> */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Term
              </label>
              <input
                type="text"
                name="term"
                value={programForm.term}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={programForm.startDate}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={programForm.endDate}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Domestic Fee (CAD)
              </label>
              <input
                type="number"
                name="fees.domestic"
                value={programForm.fees.domestic}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                International Fee (CAD)
              </label>
              <input
                type="number"
                name="fees.international"
                value={programForm.fees.international}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Duration (Terms)
              </label>
              <input
                type="number"
                name="duration"
                value={programForm.duration}
                onChange={(e) => {
                  handleChange(e);
                  const newDuration = e.target.value;
                  // Ensure at least 3 courses for each term
                  setCourses(
                    Array.from({ length: newDuration }, () =>
                      Array(3).fill({
                        courseCode: "",
                        courseName: "",
                        startDate: "",
                        endDate: "",
                        description: "",
                      })
                    )
                  );
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>

            {programForm.duration > 0 &&
              Array.from({ length: programForm.duration }).map((_, termIndex) => (
                <div
                  key={termIndex}
                  className="mb-8 p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-md"
                >
                  <h3 className="text-2xl font-bold mb-4 text-blue-600">
                    Term {termIndex + 1}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {" "}
                    {courses[termIndex]?.map((course, courseIndex) => (
                      <div
                        key={courseIndex}
                        className="mb-6 p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
                      >
                        <h4 className="text-lg font-semibold mb-2">
                          Course {courseIndex + 1}
                        </h4>{" "}
                        <label className="block text-gray-800 text-sm font-semibold mb-1">
                          Course Code
                        </label>
                        <input
                          type="text"
                          name="courseCode"
                          value={course.courseCode}
                          onChange={handleCourseChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                        />
                        <label className="block text-gray-800 text-sm font-semibold mb-1 mt-4">
                          Course Name
                        </label>
                        <input
                          type="text"
                          name="courseName"
                          value={course.courseName}
                          onChange={handleCourseChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                        />
                        <label className="block text-gray-800 text-sm font-semibold mb-1 mt-4">
                          Start Date
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          value={course.startDate}
                          onChange={handleCourseChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                        />
                        <label className="block text-gray-800 text-sm font-semibold mb-1 mt-4">
                          End Date
                        </label>
                        <input
                          type="date"
                          name="endDate"
                          value={course.endDate}
                          onChange={handleCourseChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                        />
                        <label className="block text-gray-800 text-sm font-semibold mb-1 mt-4">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={course.description}
                          onChange={handleCourseChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                          rows="3"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addCourseForTerm(termIndex)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Add Course for Term {termIndex + 1}
                  </button>
                </div>
              ))}

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                {editMode ? "Update Program" : "Add Program"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programListVisible &&
            programs.map((program) => (
              <li
                key={program.programCode}
                onClick={() => handleProgramClick(program.programCode)}
                className="bg-white border border-gray-300 rounded-lg p-6 shadow-2xl hover:shadow-xl transition-shadow duration-300 transform cursor-pointer"
              >
                <h2 className="text-2xl font-bold text-blue-1000 mb-2">
                  {program.programName}
                </h2>
                <p className="text-gray-700 italic">{program.description}</p>
                <p className="text-gray-700">
                  <strong>Program Code:</strong> {program.programCode}
                </p>
                <p className="text-gray-700">
                  <strong>Duration:</strong> {program.duration} Terms
                </p>
                <p className="text-gray-700">
                  <strong>Term:</strong> {program.term}
                </p>
                <p className="text-gray-700">
                  <strong>Start Date:</strong> {program.startDate}
                </p>
                <p className="text-gray-700">
                  <strong>End Date:</strong> {program.endDate}
                </p>
                <p className="font-bold text-gray-800 mb-4">
                  <strong>Fees (in CAD):</strong> Domestic:{" "}
                  {Number(program.fees.domestic).toLocaleString()}
                  {typeof program.fees.international === "number"
                    ? `/ International: ${Number(
                        program.fees.international
                      ).toLocaleString()}`
                    : `/ International: ${program.fees.international.toLocaleString()}`}
                </p>

                {isAdmin && (
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditProgram(program.programCode);
                      }}
                      className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProgram(program.programCode);
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>
    );
  };

  export default Program;
