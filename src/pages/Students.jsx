import { useEffect, useState } from "react";
import { getAllprograms, getStudents } from "../data/util";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [searchUser, setSearchUser] = useState("");
  const [comboProgram, setComboProgram] = useState("SDD-001");
  useEffect(() => {
    setUsers(
      getStudents().filter(
        (student) =>
          (student.firstName.toLowerCase().includes(searchUser.toLowerCase()) ||
            student.lastName.toLowerCase().includes(searchUser.toLowerCase()) ||
            student.birthday.toLowerCase().includes(searchUser.toLowerCase()) ||
            student.phone.toLowerCase().includes(searchUser.toLowerCase()) ||
            student.username
              .toLowerCase()
              .includes(searchUser.toLowerCase())) &&
          student.program === comboProgram
      )
    );
  }, [searchUser, comboProgram]);

  function handleChangeSearch(e) {
    setSearchUser(e.target.value);
  }

  const handleSeeDetails = (e) => {
    navigate(`/students-details/${e.target.id}`)
  };

  const handleChangeCombo = (e) => {
    setComboProgram(e.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mt-4">
        <label className="m-3 p-2">
          Choose a Program
          <select
            className="m-3 p-2 border-2"
            name="program"
            onChange={handleChangeCombo}
          >
            {getAllprograms().map((program) => (
              <option key={program.programCode} value={program.programCode}>
                {program.programName}
              </option>
            ))}
          </select>
        </label>
        <label className="m-3 p-2">
          Search
          <input
            className="border-2 m-3 p-2"
            type="text"
            onChange={handleChangeSearch}
          ></input>
        </label>
      </div>
      <div className="m-8 grid grid-cols-[auto_auto_auto_auto_auto_auto]">
        <div
          className={` bg-[--color1] py-4 px-4 text-white text-center font-bold border-b-2 border-t-2`}
        >
          First Name<br></br> Last Name
        </div>
        <div
          className={` bg-[--color1] py-4 px-4 text-white text-center font-bold border-b-2 border-t-2`}
        >
          Email<br></br>Phone
        </div>
        <div
          className={` bg-[--color1] py-4 px-4 text-white text-center font-bold border-b-2 border-t-2`}
        >
          Birthday
        </div>
        <div
          className={` bg-[--color1] py-4 px-4 text-white text-center font-bold border-b-2 border-t-2`}
        >
          Department<br></br>Program
        </div>
        <div
          className={` bg-[--color1] py-4 px-4 text-white text-center font-bold border-b-2 border-t-2`}
        >
          Username
        </div>
        <div
          className={` bg-[--color1] py-4 px-4 text-white text-center font-bold border-b-2 border-t-2`}
        >
          Action
        </div>
        {!users
          ? null
          : users.map((user, index) => (
              <>
                <div
                key={index}
                  className={`${
                    index % 2 === 0 ? "bg-sky-200" : null
                  } py-2 px-4 border-b-2`}
                >
                  {user.firstName}
                  <br></br>
                  {user.lastName}
                </div>
                <div
                  className={`${
                    index % 2 === 0 ? "bg-sky-200" : null
                  } py-2 px-4 border-b-2`}
                >
                  {user.email}
                  <br></br>
                  {user.phone}
                </div>
                <div
                  className={`${
                    index % 2 === 0 ? "bg-sky-200" : null
                  } py-2 px-4 border-b-2`}
                >
                  {user.birthday}
                </div>
                <div
                  className={`${
                    index % 2 === 0 ? "bg-sky-200" : null
                  } py-2 px-4 border-b-2`}
                >
                  {user.department}
                  <br></br>
                  {user.program}
                </div>
                <div
                  className={`${
                    index % 2 === 0 ? "bg-sky-200" : null
                  } py-2 px-4 border-b-2`}
                >
                  {user.username}
                </div>
                <div className={`${
                    index % 2 === 0 ? "bg-sky-200" : null
                    } py-2 px-4 border-b-2`}>

                <button
                  id={user.userId}
                  onClick={handleSeeDetails}
                  className={` text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
                    >
                  See Courses
                </button>
                  </div>
              </>
            ))}
      </div>
    </div>
  );
};

export default Students;
