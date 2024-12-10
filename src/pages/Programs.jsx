import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProgram, getLoggedUser, getPrograms } from "../data/api";
import CardProgram from "../components/CardProgram";
import AddEditForm from "../components/AddEditFormProgram";
import Alert from "../components/Alert";

export default function Programs() {
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState(null); //used to display terms in courses component
  const [loggedUser, setLoggedUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [allPrograms, setAllPrograms] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [programsFiltered, setProgramsFiltered] = useState();
  const [alertMessage, setAlertMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const [view, setView] = useState("list"); // list || edit || add

  useEffect(() => {
    // Retrieve user information using the cookie
    async function getData() {
      await updateAllPrograms();
      const res = await getLoggedUser();
      setLoggedUser(res.response);
      setIsLoading(false);
    }
    getData();
  }, [view]);

  async function updateAllPrograms() {
    const programs = await getPrograms();
    setAllPrograms(programs);
  }

  useEffect(() => {
    if (allPrograms) {
      setProgramsFiltered(
        allPrograms.filter((program) => {
          return (
            program.programname
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            program.programcode.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      );
      setIsLoading(false);
    }
  }, [allPrograms, searchTerm]);

  function handleEditProgram(e) {
    setView("edit");
    setSelectedProgram(
      allPrograms.filter((program) => program.programcode === e)[0]
    );
  }

  function handleProgramClick(programCode) {
    navigate(`/courses/${programCode}`);
  }

  function handleAddProgram() {
    setSelectedProgram(null);
    setView("add");
  }

  async function handleDeleteProgram(programcode) {
    const result = await deleteProgram({ programcode: programcode });
    updateAllPrograms();
    setAlertMessage(result.response.message);
    setTypeAlert(result.status < 300 ? "sucess" : "alert");
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  }

  if (isLoading) return <div> Loading . . . </div>;

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {view === "list" && (
        <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-1000">
          Available Programs
        </h1>
      )}

      {!loggedUser
        ? null
        : loggedUser.isadmin &&
          view === "list" && (
            <div className="text-center mb-4">
              <button
                onClick={handleAddProgram}
                className={`text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color1)] border-solid border-2 border-[var(--color1)] hover:text-[var(--color1)] hover:bg-white`}
              >
                Add Program
              </button>
            </div>
          )}

      {view === "list" && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
      )}

      {view !== "list" && (
        <AddEditForm
          view={view}
          selectedProgram={selectedProgram}
          setView={setView}
          updateAllPrograms={updateAllPrograms}
          setTypeAlert={setTypeAlert}
          setAlertMessage={setAlertMessage}
          setShowMessage={setShowMessage}
        />
      )}

      {view === "list" && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isLoading &&
            programsFiltered.map((program) => (
              <CardProgram
                key={program.programcode}
                isadmin={!loggedUser ? false : loggedUser.isadmin}
                program={program}
                handleProgramClick={handleProgramClick}
                handleDeleteProgram={handleDeleteProgram}
                handleEditProgram={handleEditProgram}
              />
            ))}
        </ul>
      )}
      {showMessage ? (
        <>
          <Alert
            showMessage={showMessage}
            message={alertMessage}
            onClick={() => {
              setShowMessage(false);
            }}
            type={typeAlert}
          />
        </>
      ) : null}
    </div>
  );
}
