import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import courses from "../data/courses"; // Ensure this path is correct
import { users } from '../data/data'; // Ensure this path is correct

const Courses = () => {
  const { programCode } = useParams();
  const navigate = useNavigate();
  const programCourses = courses[programCode];

  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [coursesData, setCoursesData] = useState(courses); // Local state to manage course deletion
  const [isAdmin, setIsAdmin] = useState(false); // State for admin check
  const [isAddingCourse, setIsAddingCourse] = useState(false); // State for showing the add course form
  const [newCourse, setNewCourse] = useState({ // State for new course details
    courseCode: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const loggedInUsername = sessionStorage.getItem("username"); // Dynamically fetch logged-in username from session storage
    const loggedInUser = users.find((user) => user.username === loggedInUsername); // Fetch user from data
    if (loggedInUser) {
      setIsAdmin(loggedInUser.isAdmin || false);
      console.log("Admin Status:", loggedInUser.isAdmin); // Debugging line
    } else {
      console.log("User not found in data."); // Debugging line
    }
  }, []);

  if (!programCourses) {
    return <div className="text-red-500 text-center">Program not found!</div>;
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
      updatedCourses[programCode].terms[term] = updatedCourses[programCode].terms[term].filter(
        (course) => course.courseCode !== courseCode
      );

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

  const handleSubmit = (term) => {
    // Check that all fields are filled
    if (
      newCourse.courseCode &&
      newCourse.name &&
      newCourse.description &&
      newCourse.startDate &&
      newCourse.endDate
    ) {
      // Create new course object
      const courseToAdd = {
        courseCode: newCourse.courseCode,
        name: newCourse.name,
        description: newCourse.description,
        startDate: newCourse.startDate,
        endDate: newCourse.endDate,
      };

      // Update courses data
      const updatedCourses = { ...coursesData };
      updatedCourses[programCode].terms[term].push(courseToAdd);

      // Update state
      setCoursesData(updatedCourses);
      // Reset the form and hide it
      setNewCourse({ courseCode: '', name: '', description: '', startDate: '', endDate: '' });
      setIsAddingCourse(false);
    } else {
      alert("All fields are required to add a course.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-800 text-white hover:bg-gray-400 transition-colors duration-300 px-4 py-2 rounded"
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

      {isAddingCourse ? (
        <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Add New Course
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(Object.keys(filteredCourses[0].courses).length ? filteredCourses[0].term : '');
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
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800">
              Add Course
            </button>
            <button
              type="button"
              onClick={() => setIsAddingCourse(false)}
              className="ml-4 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(({ term, courses }, index) =>
            courses.length > 0 ? (
              <div
                key={term}
                className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg"
              >
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  {term}
                </h2>
                <ul>
                  {courses.map((course) => (
                    <li
                      key={course.courseCode}
                      className={`mb-4 p-4 rounded-lg shadow-md transition-all duration-300 transform cursor-pointer ${
                        index % 2 === 0
                          ? "bg-blue-50 hover:bg-blue-100"
                          : "bg-green-50 hover:bg-green-100"
                      }`}
                    >
                      <h3 className="text-xl font-bold">{course.name}</h3>
                      <p className="text-gray-600">{course.description}</p>
                      <p className="text-gray-500">
                        {course.startDate} - {course.endDate}
                      </p>
                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteCourse(term, course.courseCode)}
                          className="mt-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800"
                        >
                          Delete Course
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                {isAdmin && (
                  <button
                    onClick={() => handleAddCourse(term)}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
                  >
                    Add Course
                  </button>
                )}
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default Courses;
