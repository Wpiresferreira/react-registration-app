import { useEffect, useState } from "react";
import { getLoggedUser, getMessages, sendMessage, setmessagereadstatus } from "../data/api";
import Alert from "../components/Alert";

const Contact = () => {
  const [loggedUser, setLoggedUser] = useState(null); // Initialize to null
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [allMessages, setAllMessages] = useState();
  const [selectedTab, setSelectedTab] = useState("Unread");
  const [qtUnreadMessages, setQtUnreadMessages] = useState();
  const [qtArchivedMessages, setQtArchivedMessages] = useState();

  const [subject, setSubject] = useState("");
  const [bodyMessage, setBodyMessage] = useState("");


  const updateAllMessages = async () => {
    setAllMessages(await getMessages(sessionStorage.getItem("sessionId")));
    
  }
      
  useEffect(() => {
    // Retrieve user information using the sessionId
    async function getData() {
      const user = await getLoggedUser(sessionStorage.getItem("sessionId"));
      setLoggedUser(user);
      if (user.isadmin) {
      setAllMessages(await getMessages(sessionStorage.getItem("sessionId")));
      }

    }
    getData();
    setIsLoading(false);
  }, []);



  useEffect(() => {
    if (allMessages) {
      setQtArchivedMessages(
        allMessages.reduce((acum, cur) => {
          if (cur.wasread) return acum + 1;
          else return acum;
        }, 0)
      );
      setQtUnreadMessages(
        allMessages.reduce((acum, cur) => {
          if (!cur.wasread) return acum + 1;
          else return acum;
        }, 0)
      );
    }
  }, [allMessages]);

  //variable to control state (unread ou archivied messages TAB)
  const handleOnClickTab = (e) => {
    setSelectedTab(e.target.innerText.split(" ")[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Check and validate inputs
    if (subject.length < 1) {
      setAlertMessage("Invalid Title");
      setShowMessage(true);
      return;
    }
    if (bodyMessage.length < 1) {
      setAlertMessage("Invalid Message");
      setShowMessage(true);
      return;
    }

    const result = await sendMessage({
      userid: loggedUser.userid,
      title: subject,
      message: bodyMessage,
    });

    console.log( result)

    setBodyMessage("");
    setSubject("");
  };

  const handleOnClickReadButton = (e) => {
    
    console.log(e.target.innerText)
    if(e.target.innerText === "Archive"){
      setmessagereadstatus(e.target.parentElement.id, true)
    }else if (e.target.innerText === "Mark as Unread"){
      setmessagereadstatus(e.target.parentElement.id, false)
      console.log('Mark as Unread')
    }


    const tempMessages = [...allMessages]

    for(let i = 0; i < tempMessages.length;i++){

      if(tempMessages[i].messageid === Number(e.target.parentElement.id)){
        tempMessages[i].wasread = !tempMessages[i].wasread
      }
    }
    setAllMessages(tempMessages);
  };

  if (isLoading) return <div>Loading...</div>;

  return loggedUser == null ? (
    <div>No user Logged</div>
  ) : loggedUser.isadmin ? (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-[80vw] mt-4">
        <div className="flex">
          <button
            onClick={handleOnClickTab}
            className={` ${
              selectedTab === "Unread" ? "bg-sky-400  font-bold" : "bg-sky-200"
            } grow h-12 rounded-t-2xl`}
          >
            Unread Messages ({qtUnreadMessages})
          </button>
          <button
            onClick={handleOnClickTab}
            className={` ${
              selectedTab === "Archived" ? "bg-sky-400 font-bold" : "bg-sky-200"
            } grow h-12 rounded-t-2xl`}
          >
            Archived Messages ({qtArchivedMessages})
          </button>
        </div>
        <div className="bg-sky-400">
          {!allMessages
            ? null
            : allMessages
                .filter((message) =>
                  selectedTab === "Unread" ? !message.wasread : message.wasread
                )
                .map((m) => (
                  <div
                    key={m.messageid}
                    id={m.messageid}
                    className="m-4 flex flex-col  w-[70vw] bg-sky-300 rounded-2xl"
                  >
                    <p className="m-2">
                      <b>From: </b>
                      {m.last_name + ", " + m.first_name}
                      <br></br>
                      <b> Date: </b>
                      {new Date(m.date).toLocaleString()}
                    </p>
                    <p className="mx-2 bg-white p-2">
                      <b>Title: </b>
                      {m.title}
                    </p>
                    <p className="mx-2 bg-white p-2">
                      <b>Message: </b>
                      {m.message}
                    </p>
                    <button
                      className="self-end text-center mx-5 border-solid border-[1px] w-28 rounded-xl text-white bg-red-800 border-black"
                      id={"btn_" + m.messageid}
                      onClick={handleOnClickReadButton}
                    >
                      {m.wasread ? "Mark as Unread" : "Archive"}
                    </button>
                    <br></br>
                  </div>
                ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center mt-4">
      <form
        className={`${
          loggedUser.isadmin ? "hidden" : null
        } flex flex-col rounded-xl max-w-[800px] min-w-[600px] max-h-[600px] min-h-[400px] bg-sky-200`}
      >
        <div className="my-5 text-2xl self-center">Contact us</div>
        <p className="m-4">
          {" "}
          <b>From: </b>
          {loggedUser.last_name + ", " + loggedUser.first_name}{" "}
        </p>
        <label className="mx-4 my-2">
          <b>Title</b>
          <br></br>
          <input
            value={subject}
            className="mx-4 my-2 w-[95%]"
            onChange={(e) => setSubject(e.target.value)}
          ></input>
        </label>
        <div className="mx-4 my-2">
          <b>Message:</b>
          <br></br>
        </div>
        <textarea
          value={bodyMessage}
          onChange={(e) => setBodyMessage(e.target.value)}
          className="mx-4 my-2 p-2 h-52 rounded-xl"
        ></textarea>
        <button className="m-4" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      {showMessage ? (
        <Alert
          showMessage={showMessage}
          message={alertMessage}
          onClick={() => {
            setShowMessage(false);
          }}
          type={typeAlert}
        />
      ) : null}
    </div>
  );
};

export default Contact;
