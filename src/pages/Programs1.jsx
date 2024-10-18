import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllprograms, getLoggedUser } from "../data/util"; // Adjust this import to your actual data file path

const Program = () => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState("");
  const [programs, setPrograms] = useState(getAllprograms());

  useEffect(() => {
    const sessionId = JSON.parse(
      sessionStorage.getItem("sessionId")
    )?.sessionId;
    if (sessionId) {
      setLoggedUser(getLoggedUser(sessionId));
    }
    setPrograms(getAllprograms());
  }, []);

  const handleProgramClick = (programCode) => {
    navigate(`/courses/${programCode}`);
  };

  const handleAddProgram = () => {
    alert("Add Program functionality goes here.");
  };

  const handleEditProgram = (programCode) => {
    navigate(`/edit-programs/${programCode}`);
  };

  if(!loggedUser) return null


  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        Available Programs
      </h1>

      {loggedUser.isAdmin && (
        <div className="text-center mb-4">
          <button
            onClick={handleAddProgram}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Program
          </button>
        </div>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <li
            key={program.programCode}
            onClick={() => handleProgramClick(program.programCode)}
            className="bg-white border border-gray-300 rounded-lg p-6 shadow-2xl hover:shadow-xl transition-shadow duration-300 transform cursor-pointer"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
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
              <strong>Fees:</strong> Domestic:{" "}
              {program.domesticFee.toLocaleString()} / International:{" "}
              {!Number(program.internationalFee)? program.internationalFee : new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(program.internationalFee)}
            </p>

            {loggedUser.isAdmin && (
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
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Program;
