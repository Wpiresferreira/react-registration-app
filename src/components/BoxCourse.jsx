import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";

export default function BoxCourse({ course, action, isadmin }) {
  return (
    <div className="flex flex-col p-2 w-72 m-2 items-center border rounded-md bg-slate-100">
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
        <div className="flex h-12 w-24 self-end">
          <button
            id={`edit-${course.coursecode}`}
            onClick={action}
            className="border rounded-md bg-sky-500 h-[36px] w-[36px] p-2"
          >
            <PencilSquareIcon className="fill-white" />
          </button>
          <button
            id={`delete-${course.coursecode}`}
            onClick={action}
            className="border rounded-md bg-red-500 h-[36px] w-[36px] p-2"
          >
            <TrashIcon className=" fill-white" />
          </button>
        </div>
      )}
    </div>
  );
}
