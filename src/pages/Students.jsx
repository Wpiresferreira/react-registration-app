import { useEffect, useState } from "react";
import { sortBy } from "../data/util";
import { useNavigate } from "react-router-dom";
import { getPrograms, getStudents } from "../data/api";
// import { getLoggedUser, getPrograms, getStudents } from "../data/api";

export default function Students() {
  const navigate = useNavigate();
  const [allStudents, setAllStudents] = useState();
  const [allPrograms, setAllPrograms] = useState();
  const [students, setStudents] = useState();
  const [programSelected, setProgramSelected] = useState();
  const [ascDescCriteriaSort, setAscDescCriteriaSort] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve user information using the sessionId
    async function getData() {
        setAllStudents((await getStudents()).response);
      setProgramSelected("SDD-001");
      setAllPrograms(await getPrograms());
    }
    getData();
    setIsLoading(false);
  }, []);

  const [searchUser, setSearchUser] = useState("");

  useEffect(() => {
    if (!allStudents) return;
    if (programSelected === "*") {
      setStudents(
        allStudents.filter(
          (student) =>
            student.first_name
              .toLowerCase()
              .includes(searchUser.toLowerCase()) ||
            student.last_name
              .toLowerCase()
              .includes(searchUser.toLowerCase()) ||
            student.birthday.toLowerCase().includes(searchUser.toLowerCase()) ||
            student.phone.toLowerCase().includes(searchUser.toLowerCase()) ||
            student.username.toLowerCase().includes(searchUser.toLowerCase())
        )
      );
    } else {
      setStudents(
        allStudents.filter(
          (student) =>
            (student.first_name
              .toLowerCase()
              .includes(searchUser.toLowerCase()) ||
              student.last_name
                .toLowerCase()
                .includes(searchUser.toLowerCase()) ||
              student.birthday
                .toLowerCase()
                .includes(searchUser.toLowerCase()) ||
              student.phone.toLowerCase().includes(searchUser.toLowerCase()) ||
              student.username
                .toLowerCase()
                .includes(searchUser.toLowerCase())) &&
            student.program === programSelected
        )
      );
    }
  }, [searchUser, programSelected, allStudents]);

  function handleChangeSearch(e) {
    setSearchUser(e.target.value);
  }

  function sortByFirstName() {
    setStudents(sortBy(students, "first_name", ascDescCriteriaSort));
    setAllStudents(sortBy(allStudents, "first_name", ascDescCriteriaSort));
    ascDescCriteriaSort === "asc"
      ? setAscDescCriteriaSort("desc")
      : setAscDescCriteriaSort("asc");
  }

  function sortByBirthday() {
    setStudents(sortBy(students, "birthday", ascDescCriteriaSort));
    setAllStudents(sortBy(allStudents, "birthday", ascDescCriteriaSort));
    ascDescCriteriaSort === "asc"
      ? setAscDescCriteriaSort("desc")
      : setAscDescCriteriaSort("asc");
  }

  function handleChangeCombo(e) {
    setProgramSelected(e.target.value);
  }

  if (isLoading) return <h1>Loading. . .</h1>;

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
            {!allPrograms
              ? null
              : [
                  ...allPrograms,
                  { programcode: "*", programname: "All Programs" },
                ].map((program) => (
                  <option key={program.programcode} value={program.programcode}>
                    {program.programname}
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
      <div className="m-8 grid grid-cols-[130px_280px_130px_155px_196px_180px]">
        <div
          onClick={sortByFirstName}
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
          onClick={sortByBirthday}
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
        {!students
          ? null
          : students.map((user, index) => (
              <>
                <div
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-sky-200" : null
                  } py-2 px-4 border-b-2`}
                >
                  {user.first_name}
                  <br></br>
                  {user.last_name}
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
                  {new Date(user.birthday).toLocaleDateString()}
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
                <div
                  className={`${
                    index % 2 === 0 ? "bg-sky-200" : null
                  } py-2 px-4 border-b-2`}
                >
                  <button
                    id={user.userid}
                    onClick={(e) => {
                      navigate(`/students-details/${e.target.id}`);
                    }}
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
}
