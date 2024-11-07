export async function fecthUsers() {
  await fetch("http://localhost:5000/listusers").then((res) => {
    return res.json();
  });
}

export async function doLogin(user, pass) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request("http://localhost:5000/login", {
    method: "POST",
    body: JSON.stringify({ username: user, password: pass }),
    headers: myHeaders,
  });
  try {
    const result = await fetch(req).then((res) => {
      return res.json();
    });

    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function updateUser(user) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request("http://localhost:5000/updateuser", {
    method: "PUT",
    body: JSON.stringify(user),
    headers: myHeaders,
  });

  try {
    const result = await fetch(req).then((res) => {
      return res.json();
    });

    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getLoggedUser(sessionId) {
  if (!sessionId) return;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request("http://localhost:5000/getloggeduser", {
    method: "POST",
    body: JSON.stringify({ sessionid: sessionId }),
    headers: myHeaders,
  });

  try {
    const result = await fetch(req).then((res) => {
      return res.json();
    });
    console.log(result);
    return await result;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function signup(user) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request("http://localhost:5000/signup", {
    method: "POST",
    body: JSON.stringify(user),
    headers: myHeaders,
  });
  const result = await fetch(req).then((res) => {
    return res.json();
  });
  return await result;
}

export async function getPrograms(searchTerm) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request("http://localhost:5000/getprograms", {
    method: "GET",
    headers: myHeaders,
  });
  try {
    const result = await fetch(req).then((res) => {
      return res.json();
    });
    return result;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function getMessages(sessionId) {
  if (!sessionId) return;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request("http://localhost:5000/getmessages", {
    method: "POST",
    body: JSON.stringify({ sessionid: sessionId }),
    headers: myHeaders,
  });

  try {
    const result = await fetch(req).then((res) => {
      // console.log(res);
      return res.json();
    });
    return await result;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getStudents(sessionId) {
  if (!sessionId) return;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request("http://localhost:5000/getstudents", {
    method: "POST",
    body: JSON.stringify({ sessionid: sessionId }),
    headers: myHeaders,
  });

  try {
    const result = await fetch(req).then((res) => {
      // console.log(res);
      return res.json();
    });
    return await result;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export async function sendMessage(message) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request("http://localhost:5000/sendmessage", {
    method: "POST",
    body: JSON.stringify(message),
    headers: myHeaders,
  });

  try {
    const result = await fetch(req).then((res) => {
      // console.log(res);
      return res.json();
    });
    return await result;
  } catch (e) {
    console.log(e);
    return null;
  }
}


export async function setmessagereadstatus(messageid,wasread) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request("http://localhost:5000/setmessagereadstatus", {
    method: "PATCH",
    body: JSON.stringify({
      messageid: messageid,
    wasread : wasread}),
    headers: myHeaders,
  });

  try {
    const result = await fetch(req).then((res) => {
      // console.log(res);
      return res.json();
    });
    return await result;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function getMyCoursesByTerm(user, termId) {
  const allMyEnrolments = JSON.parse(localStorage.getItem("enrolments")).filter(
    (enrolment) =>
      enrolment.userId === user.userId && enrolment.termId === termId
  );
  const allCourses = JSON.parse(localStorage.getItem("coursesData"));

  const listCourses = Object.entries(allCourses[user.program].terms);

  const myProgramCourses = [];

  listCourses.forEach((term) => {
    term[1].forEach((course) => {
      myProgramCourses.push(course);
    });
  });

  const result = [];
  for (let i = 0; i < allMyEnrolments.length; i++) {
    result.push(
      myProgramCourses.filter(
        (course) => course.courseCode === allMyEnrolments[i].courseCode
      )[0]
    );
  }
  return result;
}