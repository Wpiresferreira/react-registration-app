import { v4 as uuidv4 } from "uuid";
import { users } from "./data"; // Importing user data from the data.js file

export function getLoggedUser(sessionId) {
  let sessionUserId = JSON.parse(localStorage.getItem("sessions")).filter(
    (session) => session.sessionId === sessionId
  );
  let allUsers = JSON.parse(localStorage.getItem("users"))

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

export function sendMessage(newMessage) {

  const allMessages = getMessages()
  const newAllMessages = [...allMessages, newMessage]
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
  let allUsers = JSON.parse(localStorage.getItem("users"))
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
export function addUserToLocalStorage(newUser) {
  if (localStorage.getItem("users")) {
    let users = [...JSON.parse(localStorage.getItem("users")), newUser];
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    localStorage.setItem("users", JSON.stringify([newUser]));
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
