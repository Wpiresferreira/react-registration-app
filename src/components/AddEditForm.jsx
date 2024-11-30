import { useEffect, useState } from "react";
import { ParseNumber } from "../data/util";
import { addProgram, editProgram } from "../data/api";

export default function AddEditForm({
  view,
  updateAllPrograms,
  selectedProgram,
  setView,
  setAlertMessage,
  setTypeAlert,
  setShowMessage,
}) {
  const [programForm, setProgramForm] = useState({
    programcode: "",
    programname: "",
    duration: "",
    term: "",
    startdate: "",
    enddate: "",
    domesticfee: 0,
    internationalfee: 0,
    description: "",
  });

  useEffect(() => {
    if (selectedProgram) {
      setProgramForm({
        programcode: selectedProgram.programcode,
        programname: selectedProgram.programname,
        duration: selectedProgram.duration,
        term: selectedProgram.term,
        startdate: selectedProgram.startdate
          ? new Intl.DateTimeFormat("en-CA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(Date.parse(selectedProgram.startdate))
          : null,
        enddate: selectedProgram.enddate
          ? new Intl.DateTimeFormat("en-CA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(Date.parse(selectedProgram.enddate))
          : null,
        domesticfee: ParseNumber(selectedProgram.domesticfee),
        internationalfee: ParseNumber(selectedProgram.internationalfee),
        description: selectedProgram.description,
      });
    }
  }, [selectedProgram]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgramForm({
      ...programForm,
      [name]: value,
    });
  };

  function handleCancel(){
    setView("list");
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    const formToSubmit = programForm;
var result;
    if (view === "edit") {
      result = await editProgram(formToSubmit)
    } else if (view === "add") {
      result = await addProgram(formToSubmit);
    }
    if (result.status < 300) {
      setAlertMessage(result.response.message);
      setTypeAlert("sucess")
      setTimeout(() => {
        setView("list");
        setShowMessage(false)
      }, 1000);
    } else {
      setTypeAlert("alert")
      setAlertMessage(result.response.message)
    }
    setShowMessage(true);

    await updateAllPrograms();
  }

  return (
    <>
      {/* //   Back Button */}
      <button
        onClick={() => setView("list")}
        className="bg-gray-800 text-white hover:bg-gray-600 transition-colors duration-300 px-4 py-2 rounded"
      >
        Back
      </button>
      <form
        onSubmit={handleFormSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-4">
          {view === "edit"
            ? "Edit Program"
            : view === "add"
            ? "Add Program"
            : null}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Program Code
          </label>
          <input
            type="text"
            name="programcode"
            value={programForm.programcode}
            onChange={handleChange}
            disabled={view === "edit"}
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
            name="programname"
            value={programForm.programname}
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
            disabled={view === "edit"} // Program duration shouldn't be editable during edit
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
            name="startdate"
            value={programForm.startdate}
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
            name="enddate"
            value={programForm.enddate}
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
            name="domesticfee"
            value={programForm.domesticfee}
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
            name="internationalfee"
            value={programForm.internationalfee}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            {view === "edit"
              ? "Update Program"
              : view === "add"
              ? "Add Program"
              : null}
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
    </>
  );
}
