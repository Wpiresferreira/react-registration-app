export default function BoxCourse({ course, action, isadmin, id}) {
  return (
    <li
      id={id}
      className="flex flex-col p-2 w-64 m-2 items-center border rounded-md bg-slate-100 hover:bg-white"
    >
      <h1 className="text-2xl font-bold">{course.coursecode}</h1>
      <h2 className="flex justify-center items-center text-center h-20  justify-items-center-center">
        {course.coursename}
      </h2>
      <h2 className="self-start">
        <b>Credits: </b>
        {course.credits}
      </h2>
      <h2 className="self-start">
        <b>Availability: </b>
        {course.availability}
      </h2>
      {!isadmin ? null : (
        <div className="flex self-end mt-4">

          <button
            id={`delete-${course.coursecode}`}
            onClick={action}
            className={`fa fa-trash-o text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
          >
          </button>
          <button
            id={`openEdit-${course.coursecode}`}
            onClick={action}
            className={`fa fa-edit text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color1)] border-solid border-2 border-[var(--color1)] hover:text-[var(--color1)] hover:bg-white`}
          >
          </button>
        </div>
      )}
    </li>
  );
}
