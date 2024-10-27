export async function fecthUsers() {
  await fetch("https://express-omega-coral.vercel.app/listusers").then(
    (res) => {
      return res.json();
    }
  );
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

  const result = await fetch(req).then((res) => {
    return res.json();
  });

  return result;
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
  const result = await fetch(req).then((res) => {
    return res.json();
  });
  console.log(result)
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
    const result = await fetch(req).then((res) => {
      return res.json();
    });
    
  
    return result;
  }