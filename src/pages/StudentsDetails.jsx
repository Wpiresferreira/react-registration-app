import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserByUserId } from "../data/util";
import ListCourses from "../components/ListCourses";

const StudentsDetails = () => {
  const { studentId } = useParams();
  // const [studentObj, setStudentObject] = useState();

  useEffect(() => {
    // setStudentObject(getUserByUserId(studentId));
  }, [studentId]);

  if (!studentId) {
    return <div className="text-red-500 text-center">Program not found!</div>;
  }

  return (
    <>
      <ListCourses studentId = {studentId}  />
    </>
  );
};

export default StudentsDetails;
