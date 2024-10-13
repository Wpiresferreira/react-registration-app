import { v4 as uuidv4 } from "uuid";
import { users } from "./data"; // Importing user data from the data.js file

export function getLoggedUser(sessionId) {
  let sessionUserId = JSON.parse(localStorage.getItem("sessions")).filter(
    (session) => session.sessionId === sessionId
  );
  let allUsers = JSON.parse(localStorage.getItem("users"));

  return allUsers.filter((user) => user.userId === sessionUserId[0].userId)[0];
}

export function getMessages() {
  let result;
  result = JSON.parse(localStorage.getItem("messages"));
  for (let i = 0; i < result.length; i++) {
    let userMsg = users.filter((user) => {
      return user.userId === result[i].userId;
    });
    result[i].firstName = userMsg[0].firstName;
    result[i].lastName = userMsg[0].lastName;
  }
  return result;
}
export function getEnrolments() {
  let result;
  result = JSON.parse(localStorage.getItem("enrolments"));
  return result;
}

export function getCourses(program) {
  let result;
  result = JSON.parse(localStorage.getItem("courses")).filter(
    (course) => course.programCode === program
  );
  return result;
}

export function getRemainingCourses(loggedUser) {

  const myCourses = getMyCoursesCode(loggedUser.userId)
  console.log(JSON.parse(localStorage.getItem("courses")).filter(
    (course) => course.programCode === loggedUser.program))
  let result;
  result = JSON.parse(localStorage.getItem("courses")).filter(
    (course) => course.programCode === loggedUser.program
    && !myCourses.includes(course.courseCode)
  );
  return result;
}
export function getStudentCoursesCode(userId) {
  const enrolments = JSON.parse(localStorage.getItem("enrolments"));
  const filteredEnrolments = enrolments.filter(
    (enrolment) => enrolment.userId === userId
  );
  const userCourseCodes = filteredEnrolments.reduce(
    (acum, current) => acum.includes(current.courseCode),
    []
  );
  return userCourseCodes;
}

export function getStudentTerms(userId) {
  const enrolments = JSON.parse(localStorage.getItem("enrolments"));
  const filteredEnrolments = enrolments.filter(
    (enrolment) => enrolment.userId === userId
  );
  const userTermsId = Array.from(
    filteredEnrolments.reduce((set, e) => set.add(e.termId), new Set())
  );

  const userTerms = JSON.parse(localStorage.getItem("terms")).filter((term) =>
    userTermsId.includes(term.termId)
  );
  return userTerms;
}
export function getTerms() {
  let result;
  result = JSON.parse(localStorage.getItem("terms"));
  return result;
}

export function sendMessage(newMessage) {
  const allMessages = getMessages();
  const newAllMessages = [...allMessages, newMessage];
  localStorage.setItem("messages", JSON.stringify(newAllMessages));
}

export function updateAllMessages(messages) {
  localStorage.setItem("messages", JSON.stringify(messages));
}

export function getQtUnreadMessages() {
  const result = JSON.parse(localStorage.getItem("messages"));
  return result.reduce(
    (acum, message) => (acum = !message.wasRead ? acum + 1 : acum),
    0
  );
}

export function getQtArchivedMessages() {
  const result = JSON.parse(localStorage.getItem("messages"));
  return result.reduce(
    (acum, message) => (acum = message.wasRead ? acum + 1 : acum),
    0
  );
}

export function doLogin(username, password) {
  let allUsers = JSON.parse(localStorage.getItem("users"));
  let loggedUser = allUsers.filter(
    (user) => user.username === username && user.password === password
  );
  if (loggedUser.length > 0) {
    const newSessionId = uuidv4();
    sessionStorage.setItem(
      "sessionId",
      JSON.stringify({ sessionId: newSessionId })
    );

    if (localStorage.getItem("sessions")) {
      let sessions = [
        ...JSON.parse(localStorage.getItem("sessions")),
        {
          sessionId: newSessionId,
          userId: loggedUser[0].userId,
          startSession: new Date(),
        },
      ];
      localStorage.setItem("sessions", JSON.stringify(sessions));
    } else {
      let sessions = [
        {
          sessionId: newSessionId,
          userId: loggedUser[0].userId,
          startSession: new Date(),
        },
      ];

      console.log("newSessionId");
      console.log(newSessionId);
      localStorage.setItem("sessions", JSON.stringify(sessions));
    }
    return true;
  } else {
    return false;
  }
}

// Add new user to localStorage
export function addUserToLocalStorage(
  firstName,
  lastName,
  email,
  phone,
  birthday,
  department,
  program,
  username,
  password,
  isAdmin
) {
  let newUser = {
    userId: uuidv4(),
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    birthday: birthday,
    department: department,
    program: program,
    username: username,
    password: password,
    isAdmin: isAdmin,
  };
  if (localStorage.getItem("users")) {
    let users = [...JSON.parse(localStorage.getItem("users")), newUser];
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    localStorage.setItem("users", JSON.stringify([newUser]));
  }
}
export function doSignup(
  firstName,
  lastName,
  email,
  phone,
  birthday,
  department,
  program,
  username,
  password,
  isAdmin
) {
  //ToDo Validate all fields

  let newUser = {
    userId: uuidv4(),
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    birthday: birthday,
    department: department,
    program: program,
    username: username,
    password: password,
    isAdmin: isAdmin,
  };

  let users = [...JSON.parse(localStorage.getItem("users")), newUser];
  localStorage.setItem("users", JSON.stringify(users));

  return true;
}

export function getMyTermsId(userId) {
  const result = [];

  const myEnrolments = JSON.parse(localStorage.getItem("enrolments")).filter(
    (enrolment) => enrolment.userId === userId
  );

  for (let i = 0; i < myEnrolments.length; i++) {
    if (!result.includes(myEnrolments[i].termId)) {
      result.push(myEnrolments[i].termId);
    }
  }
  return result;
}

export function getTermDescription(termId) {
  const term = JSON.parse(localStorage.getItem("terms")).filter(
    (term) => term.termId === termId
  );
  return term[0].termSeason + " / " + term[0].termYear;
}

export function getMyCoursesByTerm(userId, termId) {
  const result = [];
  const allMyEnrolments = JSON.parse(localStorage.getItem("enrolments")).filter(
    (enrolment) => enrolment.userId === userId && enrolment.termId === termId
  );

  for (let i = 0; i < allMyEnrolments.length; i++) {
    result.push(
      JSON.parse(localStorage.getItem("courses")).filter(
        (course) => course.courseCode === allMyEnrolments[i].courseCode
      )[0]
    );
  }
  return result;
}

export function getMyCoursesCodeByTerm(userId, termId) {
  const result = [];
  const allMyEnrolments = JSON.parse(localStorage.getItem("enrolments")).filter(
    (enrolment) => enrolment.userId === userId && enrolment.termId === termId
  );

  for (let i = 0; i < allMyEnrolments.length; i++) {
    result.push(allMyEnrolments[i].courseCode);
  }

  return result;
}

export function getMyCoursesCode(userId) {
  const result = [];
  const allMyEnrolments = JSON.parse(localStorage.getItem("enrolments")).filter(
    (enrolment) => enrolment.userId === userId
  );

  for (let i = 0; i < allMyEnrolments.length; i++) {
    result.push(allMyEnrolments[i].courseCode);
  }

  return result;
}

export function dropCourse(userId, selectedCourses) {
  const allEnrolments = JSON.parse(localStorage.getItem("enrolments"));
  const tempAllEnrolments = [...allEnrolments];

for (let i=0; i< selectedCourses.length;i++){

  const indexTemp = allEnrolments.indexOf(
    allEnrolments.filter(
      (e) => e.userId === userId && e.courseCode === selectedCourses[i].courseCode
    )[0]
  );
  
  tempAllEnrolments.splice(indexTemp, 1);
  
}

for (let i = 0 ; i<getMyTermsId(userId).length;i++){
  if (tempAllEnrolments.filter((enrolment)=> enrolment.userId === userId &&
  enrolment.termId === getMyTermsId(userId)[i]).length===1){
    alert ('You must be enrolled at least 2 courses per term')
    return
  }
}
  localStorage.setItem("enrolments", JSON.stringify(tempAllEnrolments));
}
export function enrollCourse(userId, termId, courseCode) {
  const allEnrolments = JSON.parse(localStorage.getItem("enrolments"));

  allEnrolments.push({
    userId: userId,
    termId: termId,
    courseCode: courseCode,
  });

  localStorage.setItem("enrolments", JSON.stringify(allEnrolments));
}


export function getProgramDescription (programCode){
console.log(programCode)

  return !programCode? null: JSON.parse(localStorage.getItem("programs"))
  .filter((program)=>program.programCode === programCode)[0].programName
}

export function getUserByUserId (userId){
  
    return JSON.parse(localStorage.getItem("users"))
    .filter((user)=>user.userId === userId)
  }