import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import courses from "../data/courses"; // Import your courses data

const Courses = () => {
  const { programCode } = useParams(); // Get the program code from the URL
  const navigate = useNavigate(); // Initialize navigate
  const programCourses = courses[programCode]; // Fetch courses based on the program code

  if (!programCourses) {
    return <div className="text-red-500 text-center">Program not found!</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200 px-4 py-2 rounded"
        >
          Back
        </button>
      </div>

      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        Courses for {programCourses.programName}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(programCourses.terms).map(
          ([term, termCourses], index) => (
            <div
              key={term}
              className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                {term}
              </h2>
              <ul>
                {termCourses.map((course, courseIndex) => (
                  <li
                    key={course.courseCode}
                    className={`mb-4 p-4 rounded-lg shadow-md transition-all duration-300 transform cursor-pointer ${
                      index % 2 === 0
                        ? "bg-blue-50 hover:bg-blue-100"
                        : "bg-green-50 hover:bg-green-100"
                    }`}
                  >
                    <h3 className="text-xl font-semibold">{course.name}</h3>
                    <p className="text-gray-600">
                      <strong>Course Code:</strong> {course.courseCode}
                    </p>
                    {/* Uncomment if needed
                  <p className="text-gray-600">
                    <strong>Start Date:</strong> {course.startDate}
                  </p>
                  <p className="text-gray-600">
                    <strong>End Date:</strong> {course.endDate}
                  </p> */}
                    <p className="text-gray-700">{course.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Courses;
