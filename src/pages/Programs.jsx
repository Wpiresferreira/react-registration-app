import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import programsData from '../data/programs'; // Fallback data if localStorage is empty
import { getLoggedUser } from '../data/util'; // Adjust this import to your actual data file path

const Program = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [programs, setPrograms] = useState(() => {
    // Load programs from local storage or fallback to default data
    const storedPrograms = localStorage.getItem('programs');
    return storedPrograms ? JSON.parse(storedPrograms) : programsData;
  });
  const [formVisible, setFormVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [programForm, setProgramForm] = useState({
    programCode: '',
    programName: '',
    description: '',
    duration: '',
    fees: { domestic: 0, international: 0 },
    startDate: '',
    endDate: '',
    term: '',
  });

  useEffect(() => {
    const sessionId = JSON.parse(sessionStorage.getItem('sessionId'))?.sessionId;
    if (sessionId) {
      const loggedInUser = getLoggedUser(sessionId);
      setIsAdmin(loggedInUser?.isAdmin || false);
    }
  }, []);

  // Update local storage whenever programs change
  useEffect(() => {
    localStorage.setItem('programs', JSON.stringify(programs));
  }, [programs]);

  const handleProgramClick = (programCode) => {
    navigate(`/courses/${programCode}`);
  };

  const handleAddProgram = () => {
    setFormVisible(true);
    setEditMode(false);
    setProgramForm({
      programCode: '',
      programName: '',
      description: '',
      duration: '',
      fees: { domestic: 0, international: 0 },
      startDate: '',
      endDate: '',
      term: '',
    });
  };

  const handleEditProgram = (programCode) => {
    const programToEdit = programs.find(p => p.programCode === programCode);
    setProgramForm({ ...programToEdit });
    setFormVisible(true);
    setEditMode(true);
  };

  const handleDeleteProgram = (programCode) => {
    if (window.confirm(`Are you sure you want to delete program ${programCode}?`)) {
      const updatedPrograms = programs.filter(p => p.programCode !== programCode);
      setPrograms(updatedPrograms);
      alert(`Program ${programCode} deleted successfully!`);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedPrograms = programs.map(p =>
        p.programCode === programForm.programCode ? programForm : p
      );
      setPrograms(updatedPrograms);
      alert('Program updated successfully!');
    } else {
      setPrograms([...programs, programForm]);
      alert('Program added successfully!');
    }
    setFormVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('fees')) {
      setProgramForm((prevState) => ({
        ...prevState,
        fees: {
          ...prevState.fees,
          [name.split('.')[1]]: parseFloat(value),
        },
      }));
    } else {
      setProgramForm({
        ...programForm,
        [name]: value,
      });
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Available Programs</h1>

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
        <form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">{editMode ? 'Edit Program' : 'Add Program'}</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Program Code</label>
            <input
              type="text"
              name="programCode"
              value={programForm.programCode}
              onChange={handleChange}
              disabled={editMode} // Program code shouldn't be editable during edit
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Program Name</label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              name="description"
              value={programForm.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          {/* Additional inputs for duration, fees, etc. */}
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            {editMode ? 'Update Program' : 'Add Program'}
          </button>
        </form>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <li
            key={program.programCode}
            onClick={() => handleProgramClick(program.programCode)}
            className="bg-white border border-gray-300 rounded-lg p-6 shadow-2xl hover:shadow-xl transition-shadow duration-300 transform cursor-pointer"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{program.programName}</h2>
            <p className="text-gray-700 italic">{program.description}</p>
            <p className="text-gray-700"><strong>Program Code:</strong> {program.programCode}</p>
            <p className="text-gray-700"><strong>Duration:</strong> {program.duration} Terms</p>
            <p className="text-gray-700"><strong>Term:</strong> {program.term}</p>
            <p className="text-gray-700"><strong>Start Date:</strong> {program.startDate}</p>
            <p className="text-gray-700"><strong>End Date:</strong> {program.endDate}</p>
            <p className="font-bold text-gray-800 mb-4">
              <strong>Fees:</strong> Domestic: {program.fees.domestic.toLocaleString()} / International: {program.fees.international.toLocaleString()}
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

      <footer className="mt-8 text-center text-gray-600">
        <p className="text-sm">&copy; {new Date().getFullYear()} Bow Valley College. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Program;
