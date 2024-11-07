import { formatDate } from "../data/util";
import { getPrograms, getLoggedUser } from "../data/api";
import AddEditProgram from "../components/AddEditProgram";
import { useEffect, useState } from "react";

export default async function Programs() {
  
  // const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState(null); // Initialize to null
  const [programs, setPrograms] = useState(null); // Initialize to null
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Retrieve user information using the sessionId
    async function getData() {
      const user = await getLoggedUser(sessionStorage.getItem("sessionId"));
      console.log(user)
      setLoggedUser(user);
      const allPrograms = await getPrograms(searchTerm);
      setPrograms(allPrograms)
      setIsLoading(false);
    }
    getData();
  }, []);

  
  

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
  
  // useEffect(() => {
  //   const sessionId = JSON.parse(
  //     sessionStorage.getItem("sessionId")
  //   )?.sessionId;
  //   if (sessionId) {
  //     const loggedInUser = getLoggedUser(sessionId);
  //     setIsAdmin(loggedInUser?.isAdmin || false);
  //   }
  // }, []);
  
  // useEffect(() => {
  //   localStorage.setItem("programs", JSON.stringify(programs));
  // }, [programs]);

  const handleEditProgram = (programCode) => {
    const programToEdit = programs.find((p) => p.programCode === programCode);
    setProgramForm({ ...programToEdit });
    setFormVisible(true);
    setProgramListVisibility(false);
    setEditMode(true);
  };

  const handleProgramClick = (programCode) => {
    // navigate(`/courses/${programCode}`);
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
  
  // const filteredPrograms = programs.filter(
  //   (program) =>
  //     program.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   program.programCode.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-1000">
        Available Programs
      </h1>
      { (
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
        <AddEditProgram editMode={editMode}
        handleFormSubmit={handleFormSubmit}
        handleCancel={handleCancel}
        programForm={programForm}
        handleChange={handleChange}/>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {programListVisible &&
          programs.map((program) => (
            <li
              key={program.programcode}
              onClick={() => handleProgramClick(program.programcode)}
              className="bg-white border border-gray-300 rounded-lg p-6 shadow-2xl hover:shadow-xl transition-shadow duration-300 transform cursor-pointer"
            >
              <h2 className="text-2xl font-bold text-blue-1000 mb-2">
                {program.programname}
              </h2>
              <p className="text-gray-700 italic">{program.description}</p>
              <p className="text-gray-700">
                <strong>Program Code:</strong> {program.programcode}
              </p>
              <p className="text-gray-700">
                <strong>Duration:</strong> {program.duration} Terms
              </p>
              <p className="text-gray-700">
                <strong>Term:</strong> {program.term}
              </p>
              <p className="text-gray-700">
                <strong>Start Date:</strong> {formatDate(program.startdate)}
              </p>
              <p className="text-gray-700">
                <strong>End Date:</strong> {formatDate(program.enddate)}
              </p>
              <p className="text-gray-700">
                <strong>Domestic Fees (CAD): </strong> {program.domesticfee}
              </p>
              <p className="text-gray-700">
                <strong>International Fees (CAD): </strong> {program.internationalfee?program.internationalfee:'Not Available'}
              </p>

              {loggedUser && loggedUser.isadmin && (
                <div className="flex justify-between mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditProgram(program.programcode);
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProgram(program.programcode);
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

// export default Program;
