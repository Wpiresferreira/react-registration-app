import { users } from "../data/data";

const Students = () => {
  return (
    <>
      <h1>Students Page</h1>
      {users.map((user, key) => (
        <div key={key}>
        <div>{user.firstName}</div>
        <div>{user.lastName}</div>
        <div>{user.email}</div>
        <div>{user.phone}</div>
        <div>{user.birthday}</div>
        <div>{user.department}</div>
        <div>{user.program}</div>
        <div>{user.username}</div>
        <div>{user.password}</div>
        </div>
         
        
      ))}
    </>
  );
};

export default Students;
