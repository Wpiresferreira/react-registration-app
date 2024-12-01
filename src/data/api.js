 const url = 'https://express-omega-coral.vercel.app'
//const url = "http://localhost:5000";

export async function doLogin(user, pass) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request(url + "/login", {
    method: "POST",
    body: JSON.stringify({ username: user, password: pass }),
    headers: myHeaders,
    credentials: "include", // Include cookies in the request
  });
  try {
    return await fetch(req).then(async (res) => {
      return { status: res.status, response: await res.json() };
    });
  } catch (e) {
    console.error(e);
    return { status: 500, response: { message: "Check connection" } };
  }
}
export async function updateUser(user) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request("https://express-omega-coral.vercel.app/updateuser", {
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

export async function getLoggedUser() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request(url + "/getuserprofile", {
    method: "POST",
    headers: myHeaders,
    credentials: "include",
  });

  try {
    return await fetch(req).then(async (res) => {
      if (res.status === 204) {
        return {
          status: res.status,
          response: { message: "No Authenticated" },
        };
      }
      return { status: res.status, response: await res.json() };
    });
  } catch (e) {
    console.log(e);
    return { status: 500, response: { message: "Check connection" } };
  }
}
// export async function getLoggedUser(sessionId) {
//   if (!sessionId) return;
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("Accept", "*/*");

//   const req = new Request("https://express-omega-coral.vercel.app/getloggeduser", {
//     method: "POST",
//     body: JSON.stringify({ sessionid: sessionId }),
//     headers: myHeaders,
//   });

//   try {
//     const result = await fetch(req).then((res) => {
//       return res.json();
//     });
//     return await result;
//   } catch (e) {
//     return null;
//   }
// }

export async function signup(user) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request(url + "/signup", {
    method: "POST",
    body: JSON.stringify(user),
    headers: myHeaders,
  });
  const result = await fetch(req).then(async (res) => {
    return { status: res.status, response: await res.json() };
  });
  return await result;
}

export async function doLogout() {
  try {
    // Send logout request
    const response = await fetch(url + "/logout", {
      method: "POST",
      credentials: "include", // Include cookies in the request
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request(url + "/signup", {
    method: "POST",
    headers: myHeaders,
  });
  const result = await fetch(req).then(async (res) => {
    return { status: res.status, response: await res.json() };
  });
  return await result;
}

export async function getPrograms() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request(url + "/getprograms", {
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

export async function getCourses(programcode) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request(url + "/getcourses/" + programcode, {
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

export async function getMessages() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request(url + "/getmessages", {
    method: "GET",
    headers: myHeaders,
    credentials: "include", // Include cookies in the request
  });

  try {
    const result = await fetch(req).then(async (res) => {
      // console.log(res);
      return { status: res.status, response: await res.json() };
    });
    return await result;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function deleteMessage(messageId) {
  console.log("delete msg id = " + messageId);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request(url + "/deleteMessage", {
    method: "DELETE",
    headers: myHeaders,
    body: JSON.stringify({ messageid: messageId }),
    credentials: "include", // Include cookies in the request
  });

  try {
    const result = await fetch(req).then(async (res) => {
      // console.log(res);
      return { status: res.status, response: await res.json() };
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

  const req = new Request(
    "https://express-omega-coral.vercel.app/getstudents",
    {
      method: "POST",
      body: JSON.stringify({ sessionid: sessionId }),
      headers: myHeaders,
    }
  );

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

  const req = new Request(url + "/sendmessage", {
    method: "POST",
    body: JSON.stringify(message),
    headers: myHeaders,
    credentials: "include", // Include cookies in the request
  });

  try {
    const result = await fetch(req).then(async (res) => {
      if (res.status === 204) {
        return {
          status: res.status,
          response: { message: "No Authenticated" },
        };
      }
      return { status: res.status, response: await res.json() };
    });
    return await result;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function setmessagereadstatus(messageid, wasread) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request(url + "/setMessageReadStatus", {
    method: "PATCH",
    body: JSON.stringify({
      messageid: messageid,
      wasread: wasread,
    }),
    headers: myHeaders,
    credentials: "include",
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

/////////////////////PROGRAMS

export async function editProgram(program) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request(url + "/editprogram", {
    method: "POST",
    body: JSON.stringify(program),
    headers: myHeaders,
    credentials: "include",
  });

  try {
    return await fetch(req).then(async (res) => {
      return { status: res.status, response: await res.json() };
    });
  } catch (e) {
    console.error(e);
    return { status: 500, response: { message: "Check connection" } };
  }
}

export async function addProgram(program) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request(url + "/addprogram", {
    method: "POST",
    body: JSON.stringify(program),
    headers: myHeaders,
    credentials: "include",
  });

  try {
    return await fetch(req).then(async (res) => {
      return { status: res.status, response: await res.json() };
    });
  } catch (e) {
    console.error(e);
    return { status: 500, response: { message: "Check connection" } };
  }
}

export async function deleteProgram(program) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request(url + "/deleteprogram", {
    method: "DELETE",
    body: JSON.stringify(program),
    headers: myHeaders,
    credentials: "include",
  });

  try {
    return await fetch(req).then(async (res) => {
      return { status: res.status, response: await res.json() };
    });
  } catch (e) {
    console.error(e);
    return { status: 500, response: { message: "Check connection" } };
  }
}


export async function addCourse(coursecode) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request(url + "/addcourse", {
    method: "POST",
    body: JSON.stringify(coursecode),
    headers: myHeaders,
    credentials: "include",
  });

  try {
    return await fetch(req).then(async (res) => {
      return { status: res.status, response: await res.json() };
    });
  } catch (e) {
    console.error(e);
    return { status: 500, response: { message: "Check connection" } };
  }
}

export async function editCourse(course) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request(url + "/editcourse", {
    method: "POST",
    body: JSON.stringify(course),
    headers: myHeaders,
    credentials: "include",
  });

  try {
    return await fetch(req).then(async (res) => {
      return { status: res.status, response: await res.json() };
    });
  } catch (e) {
    console.error(e);
    return { status: 500, response: { message: "Check connection" } };
  }
}

export async function deleteCourse(coursecode) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  const req = new Request(url + "/deletecourse", {
    method: "DELETE",
    body: JSON.stringify({coursecode: coursecode}),
    headers: myHeaders,
    credentials: "include",
  });

  try {
    return await fetch(req).then(async (res) => {
      return { status: res.status, response: await res.json() };
    });
  } catch (e) {
    console.error(e);
    return { status: 500, response: { message: "Check connection" } };
  }
}
