import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLoggedUser } from "../data/util";
import courses from "../data/courses"; // Ensure this path is correct
import programsData from "../data/programs";

const Courses = () => {
  const { programCode } = useParams();
  const navigate = useNavigate();
  const programCourses = courses[programCode];

  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [coursesData, setCoursesData] = useState(() => {
    // Initialize courses data from local storage
    const storedCourses = localStorage.getItem("coursesData");
    return storedCourses ? JSON.parse(storedCourses) : courses;
  }); // Local state to manage course deletion
  const [isAdmin, setIsAdmin] = useState(false); // State for admin check
  const [isAddingCourse, setIsAddingCourse] = useState(false); // State for showing the add course form
  const [newCourse, setNewCourse] = useState({
    // State for new course details
    courseCode: "",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  // const [programsData, setProgramsData] = useState(() => {
  //   const storedPrograms = localStorage.getItem("programsData");
  //   return storedPrograms ? JSON.parse(storedPrograms) : [];
  // });
  const selectedProgram = programsData.find(
    (program) => program.programCode === programCode);
    const [isEditingCourse, setIsEditingCourse] = useState(false); // State for showing the edit course form
    const [courseToEdit, setCourseToEdit] = useState(null); // State to hold the course being edited
  
    console.log(selectedProgram);
  useEffect(() => {
    const sessionId = 
      sessionStorage.getItem("sessionId");
    if (sessionId) {
      const loggedInUser = getLoggedUser(sessionId);
      setIsAdmin(loggedInUser?.isAdmin || false);
    }
  }, []);

  // Update local storage whenever coursesData changes
  useEffect(() => {
    localStorage.setItem("coursesData", JSON.stringify(coursesData));
  }, [coursesData]);

  if (!programCourses) {
    return <div className="text-red-500 text-center">{`Courses are not yet added in ${programCode} program.`}
    </div>;
  }

  // Filter courses by course name or course code
  const filteredCourses = Object.entries(coursesData[programCode].terms).map(
    ([term, termCourses]) => ({
      term,
      courses: termCourses.filter(
        (course) =>
          course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    })
  );

  const handleDeleteCourse = (term, courseCode) => {
    if (!isAdmin) return; // Only allow admins to delete

    // Confirm deletion
    if (window.confirm("Are you sure you want to delete this course?")) {
      // Clone the current state of courses
      const updatedCourses = { ...coursesData };

      // Find and remove the course in the specific term
      updatedCourses[programCode].terms[term] = updatedCourses[
        programCode
      ].terms[term].filter((course) => course.courseCode !== courseCode);

      // Update the state with the updated courses
      setCoursesData(updatedCourses);
    }
  };

  const handleAddCourse = (term) => {
    const termCourses = coursesData[programCode].terms[term];

    // Check for max course limit
    if (termCourses.length >= 6) {
      alert("Cannot add more than 6 courses.");
      return;
    }

    // Show the add course form
    setIsAddingCourse(true);
  };

  const handleEditCourse = (course) => {
    setCourseToEdit(course); // Set the course to be edited
    setNewCourse({
      courseCode: course.courseCode,
      name: course.name,
      description: course.description,
      startDate: course.startDate, // Autofill start date
      endDate: course.endDate, // Autofill end date
    });
    setIsEditingCourse(true); // Show the edit course form
  };

  const handleSubmit = (term) => {
    // Check that all fields are filled
    if (
      newCourse.courseCode &&
      newCourse.name &&
      newCourse.description &&
      newCourse.startDate &&
      newCourse.endDate
    ) {
      const updatedCourses = { ...coursesData };
      if (isEditingCourse) {
        // Update existing course
        const termCourses = updatedCourses[programCode].terms[term];
        const courseIndex = termCourses.findIndex(
          (c) => c.courseCode === newCourse.courseCode
        );
        if (courseIndex !== -1) {
          termCourses[courseIndex] = newCourse; // Update the course details
        }
      } else {
        // Create new course object
        const courseToAdd = {
          courseCode: newCourse.courseCode,
          name: newCourse.name,
          description: newCourse.description,
          startDate: newCourse.startDate,
          endDate: newCourse.endDate,
          availability: "Fall/Winter/Spring/Summer",
        };

        // Add new course
        updatedCourses[programCode].terms[term].push(courseToAdd);
      }

      // Update state
      setCoursesData(updatedCourses);
      // Reset the form and hide it
      resetForm();
    } else {
      alert("All fields are required to add/edit a course.");
    }
  };

  const resetForm = () => {
    setNewCourse({
      courseCode: "",
      name: "",
      description: "",
      startDate: "",
      endDate: "",
    });
    setIsAddingCourse(false);
    setIsEditingCourse(false);
    setCourseToEdit(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
      availability: "Fall/Winter/Spring/Summer",
      
    }));
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-800 text-white hover:bg-gray-600 transition-colors duration-300 px-4 py-2 rounded"
        >
          Back
        </button>
      </div>

      <h1 className="text-4xl font-extrabold text-blue-900 mb-8 text-center">
        Courses for {programCourses.programName}
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

      {isAddingCourse || isEditingCourse ? (
        <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            {isEditingCourse ? "Edit Course" : "Add New Course"}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(
                Object.keys(filteredCourses[0].courses).length
                  ? filteredCourses[0].term
                  : ""
              );
            }}
          >
            <div className="mb-4">
              <label className="block text-gray-700">Course Code</label>
              <input
                type="text"
                name="courseCode"
                value={newCourse.courseCode}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Course Name</label>
              <input
                type="text"
                name="name"
                value={newCourse.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={newCourse.description}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={newCourse.startDate}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">End Date</label>
              <input
                type="date"
                name="endDate"
                value={newCourse.endDate}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors duration-300"
            >
              {isEditingCourse ? "Update Course" : "Add Course"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="ml-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-300"
            >
              Cancel
            </button>
          </form>
        </div>
      ) : null}

      {/* Courses List */}
      {filteredCourses.length > 0 ? (
        filteredCourses.map(({ term, courses }, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-lg p-4 mb-4 shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">
              {term}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <div
                  key={course.courseCode}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <h3 className="font-bold text-lg">
                    {course.name} ({course.courseCode})
                  </h3>
                  <p className="text-gray-600">{course.description}</p>
                  <p className="text-gray-600">
                    Start Date:{" "}
                    {new Date(course.startDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    End Date: {new Date(course.endDate).toLocaleDateString()}
                  </p>
                  {isAdmin && (
                    <div className="mt-4">
                      <button
                        onClick={() =>
                          handleDeleteCourse(term, course.courseCode)
                        }
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800 transition-colors duration-300 mr-2"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEditCourse(course)}
                        className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-800 transition-colors duration-300"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {isAdmin && (
              <button
                onClick={() => handleAddCourse(term)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition-colors duration-300 mt-4"
              >
                Add Course
              </button>
            )}
          </div>
        ))
      ) : (
        <>
          <div className="text-gray-600 text-center">
            No courses available for this program.
          </div>
          {filteredCourses.map(({ term, courses }, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-lg p-4 mb-4 shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">
              {term}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {isAdmin && (
              <button
                onClick={() => handleAddCourse(term)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition-colors duration-300 mt-4"
              >
                Add Course
              </button>
            )}
          </div></div>
        ))};
        </>
      )}
    </div>
  );
};

export default Courses;
