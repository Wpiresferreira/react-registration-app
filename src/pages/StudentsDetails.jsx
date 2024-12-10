import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ListCourses from "../components/ListCourses";

export default function StudentsDetails(){
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

