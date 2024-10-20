import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import programsData from "../data/programs";
import { getLoggedUser } from "../data/util";
import courses from "../data/courses";

const Program = () => {
  const navigate = useNavigate();
  const [selectedProgramDuration, setSelectedProgramDuration] = useState(null); //used to display terms in courses component
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
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState({
    "": {
      programName: "",
      terms: {
        "": [
          {
            courseCode: "",
            name: "",
            startDate: "",
            endDate: "",
            description: ""
          }]}
  }});
  const [selectedProgram, setSelectedProgram] = useState(null);
  

  useEffect(() => {
    const storedCourses = localStorage.getItem("courses");
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    }
  }, []);

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

  const handleEditProgram = (programCode) => {
    const programToEdit = programs.find((p) => p.programCode === programCode);
    setProgramForm({ ...programToEdit });
    setFormVisible(true);
    setProgramListVisibility(false);
    setEditMode(true);
  };

  const handleProgramClick = (programCode) => {
    navigate(`/courses/${programCode}`);
    setSelectedProgram(programs.find(program => program.programCode === programCode));
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
    });
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

    if (editMode) {
        const updatedPrograms = programs.map((p) =>
            p.programCode === programForm.programCode ? { ...programForm } : p
        );

        setPrograms(updatedPrograms);
        alert("Program updated successfully!");
    } else {
        // Initialize terms and courses based on duration
        const terms = Array.from({ length: programForm.duration }, (_, index) => ({
            term: `Term ${index + 1}`,
            courses: [] // Add course objects if you have a specific structure for courses
        }));

        const newProgram = {
            ...programForm,
            terms, // Assign initialized terms
        };

        setPrograms([...programs, newProgram]);
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

  const filteredPrograms = programs.filter(
    (program) =>
      program.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.programCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Programs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>

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
          <div className="mb-4">
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
          </div>
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
          filteredPrograms.map((program) => (
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
              <p className="text-gray-700">
                <strong>Domestic Fees (CAD): </strong> {Number(program.fees.domestic).toLocaleString()}
              </p>
              <p className="text-gray-700">
                <strong>International Fees (CAD): </strong> {Number(program.fees.international).toLocaleString()}
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
