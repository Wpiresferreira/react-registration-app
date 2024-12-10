import { useEffect, useState } from "react";
import { addCourse, editCourse } from "../data/api";

export default function AddEditFormCourse({
  view,
  updateCourses,
  selectedCourse,
  setView,
  setAlertMessage,
  setTypeAlert,
  setShowMessage,
}) {
  const [courseForm, setCourseForm] = useState({
    programcode: "",
    term: "",
    coursecode: "",
    coursename: "",
    credits: "",
    availability: "",
    prerequisites: "",
    corequisites: "",
  });

  useEffect(() => {
    if (selectedCourse) {
      setCourseForm({
        programcode: selectedCourse.programcode,
        term: selectedCourse.term,
        coursecode: selectedCourse.coursecode,
        coursename: selectedCourse.coursename,
        credits: selectedCourse.credits,
        availability: selectedCourse.availability,
        prerequisites: selectedCourse.prerequissites || "",
        corequisites: selectedCourse.corequisites || "",
      });
    }
  }, [selectedCourse]);

  function handleChange (e){
    const { name, value } = e.target;
    setCourseForm({
      ...courseForm,
      [name]: value,
    });
  };

  function handleCancel() {
    setView("list");
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    var result;
    if (view === "edit") {
      result = await editCourse(courseForm);
    } else if (view === "add") {
      result = await addCourse(courseForm);
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

    await updateCourses();
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
            ? "Edit Course"
            : view === "add"
            ? "Add Course"
            : null}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Program Code
          </label>
          <input
            type="text"
            name="programcode"
            value={courseForm.programcode}
            onChange={handleChange}
            disabled={view === "edit"}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Term
          </label>
          <input
            type="number"
            name="term"
            value={courseForm.term}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Course Code
          </label>
          <textarea
            name="coursecode"
            value={courseForm.coursecode}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Course Name
          </label>
          <input
            type="text"
            name="coursename"
            value={courseForm.coursename}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Credits
          </label>
          <input
            type="number"
            name="credits"
            value={courseForm.credits}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Availability
          </label>
          <input
            type="text"
            name="availability"
            value={courseForm.availability}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Prerequisites
          </label>
          <input
            type="text"
            name="prerequisites"
            value={courseForm.prerequisites}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Corequisites
          </label>
          <input
            type="text"
            name="corequisites"
            value={courseForm.corequisites}
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
              ? "Update Course"
              : view === "add"
              ? "Add Course"
              : null}
          </button>
        </div>
      </form>
    </>
  );
}
