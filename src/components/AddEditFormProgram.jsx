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

  function handleChange (e){
    const { name, value } = e.target;
    setProgramForm({
      ...programForm,
      [name]: value,
    });
  };

  function handleCancel() {
    setView("list");
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const formToSubmit = programForm;
    var result;
    if (view === "edit") {
      result = await editProgram(formToSubmit);
    } else if (view === "add") {
      result = await addProgram(formToSubmit);
    }
    if (result.status < 300) {
      setAlertMessage(result.response.message);
      setTypeAlert("sucess");
      setTimeout(() => {
        setView("list");
        setShowMessage(false);
      }, 1000);
    } else {
      setTypeAlert("alert");
      setAlertMessage(result.response.message);
    }
    setShowMessage(true);

    await updateAllPrograms();
  }

  return (
    <>
{/* //   Back Button */}
<button
        onClick={() => setView("list")}
        className={`fa fa-arrow-left text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
      />
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
            min = "1" max ="8"
            default = "1"
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
          <select
            type="text"
            name="term"
            value={programForm.term}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          >
            <option value={'Winter'}>Winter</option>
            <option value={'Spring/Summer'}>Spring/Summer</option>
            <option value={'Fall'}>Fall</option>
          </select>
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
            min={programForm.startdate?programForm.startdate:'1990-01-01'}
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
            step=".01"
            min="0" lang="en"
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
            step=".01"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className={`text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color1)] border-solid border-2 border-[var(--color1)] hover:text-[var(--color1)] hover:bg-white`}
          >
            {view === "edit"
              ? "Update Program"
              : view === "add"
              ? "Add Program"
              : null}
          </button>
        </div>
      </form>
    </>
  );
}
