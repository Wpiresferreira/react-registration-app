import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLoggedUser, getProgramByProgramCode, saveProgram } from "../data/util"; // Adjust this import to your actual data file path

export default function EditProgram(){

  const { programCode } = useParams(); // Get the program code from the URL
  const navigate = useNavigate(); // Initialize navigate
  const [isAdmin, setIsAdmin] = useState(false);
  const program= getProgramByProgramCode(programCode);

  const [editProgramCode, setEditProgramCode] = useState(program.programCode);
  const [editProgramName, setEditProgramName] = useState(program.programName);
  const [editDuration, setEditDuration] = useState(program.duration);
  const [editTerm, setEditTerm] = useState(program.term);
  const [editStartDate, setEditStartDate] = useState(program.startDate);
  const [editEndDate, setEditEndDate] = useState(program.endDate);
  const [editDomesticFee, setEditDomesticFee] = useState(program.domesticFee);
  const [editInternationalFee, setEditInternationalFee] = useState(
    program.internationalFee
  );
  const [editDescription, setEditDescription] = useState(program.description);

  

  useEffect(() => {
    const sessionId = JSON.parse(
      sessionStorage.getItem("sessionId")
    )?.sessionId;
    if (sessionId) {
      const loggedInUser = getLoggedUser(sessionId);
      setIsAdmin(loggedInUser?.isAdmin || false);
    }
  }, []);

  const handleSaveChanges = () => {
    saveProgram(program.programCode, {
      programCode: editProgramCode,
      programName: editProgramName,
      duration: editDuration,
      term: editTerm,
      startDate: editStartDate,
      endDate: editEndDate,
      domesticFee: editDomesticFee,
      internationalFee: editInternationalFee,
      description: editDescription,
    });
    alert('Changes Saved')
    navigate(-1)
  };


  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {/* <div>{program.programCode}</div> */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200 px-4 py-2 rounded"
        >
          Back
        </button>
      </div>

      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        Edit Program
      </h1>

      {/* {isAdmin && (
        <div className="text-center mb-4">
          <button
            onClick={handleAddProgram}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Program
          </button>
        </div>
      )} */}

      <div className="grid grid-cols-[auto_auto] gap-6">
        <label>Program Code</label>
        {program.programCode?
        <input
        onChange={(e) => setEditProgramCode(e.target.value)}
        type="text"
        defaultValue={` ${program.programCode} `}
        disabled ></input>
        :
        <input
        onChange={(e) => setEditProgramCode(e.target.value)}
        type="text"
        defaultValue={` ${program.programCode} `}
         ></input>
      }
        <label>Program Name</label>
        <input
          type="text"
          defaultValue={program.programName}
          onChange={(e) => setEditProgramName(e.target.value)}
        ></input>
        <label>Duration</label>
        <input
          onChange={(e) => setEditDuration(e.target.value)}
          type="text"
          defaultValue={program.duration}
          ></input>
        <label>Term</label>
        <input
          onChange={(e) => setEditTerm(e.target.value)}
          type="text"
          defaultValue={program.term}
     ></input>
        <label>Start Date</label>
        <input
          onChange={(e) => setEditStartDate(e.target.value)}
          type="date"
          defaultValue={program.startDate}
          ></input>
        <label>End Date</label>
        <input
          onChange={(e) => setEditEndDate(e.target.value)}
          type="date"
          defaultValue={program.endDate}
     ></input>
        <label>Domestic Fee</label>
        <input
          onChange={(e) => setEditDomesticFee(e.target.value)}
          type="number"
          defaultValue={program.domesticFee.replace("$","").replace(",","")}
        ></input>
        <label>International Fee</label>
        <input
          onChange={(e) => setEditInternationalFee(e.target.value)}
          type="number"
          defaultValue={program.internationalFee.replace("$","").replace(",","")}
                  ></input>
        <label>Description</label>
        <textarea
          onChange={(e) => setEditDescription(e.target.value)}
          className="h-36 wrap"
          type="text"
          defaultValue={program.description}
        ></textarea>

        {/* <li
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
              {program.internationalFee.toLocaleString()}
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
              </div>
            )}
          </li> */}
        {isAdmin && (
          <div className="text-center mb-4">
            <button
              onClick={handleSaveChanges}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

