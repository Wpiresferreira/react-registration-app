import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getLoggedUser, getMessages, getQtArchivedMessages, getQtUnreadMessages } from "../data/util";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState("");
  useEffect(() => {
    if (!sessionStorage.getItem("sessionId")) {
      return;
    }
    setLoggedUser(
      getLoggedUser(JSON.parse(sessionStorage.getItem("sessionId")).sessionId)
    );
  }, [navigate]);
  const [allMessages, setAllMessages] = useState(getMessages());

  //variable to control state (unread ou archivied messages TAB)
  const [selectedTab, setSelectedTab] = useState("Unread");

  const handleOnClickTab = (e) => {
    setSelectedTab(e.target.innerText.split(" ")[0]);
  };

  const [subject, setSubject] = useState("");
  const [bodyMessage, setBodyMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setAllMessages([
      ...allMessages,
      {
        messageId: uuidv4(),
        firstName: loggedUser.firstName,
        lastName: loggedUser.lastName,
        userId: loggedUser.userId,
        title: subject,
        message: bodyMessage,
        wasRead: false,
        date: (new Date()).toLocaleString(),
      }
    ]);

    alert(allMessages[allMessages.length-1].message);
    localStorage.setItem("messages", JSON.stringify(allMessages));
    setBodyMessage("");
    setSubject("");
  };

  const handleOnClickReadButton = (e) => {
    var tempListMessages = [...allMessages];
    for (let i = 0; i < tempListMessages.length; i++) {
      if (tempListMessages[i].messageId === e.target.parentElement.id) {
        tempListMessages[i].wasRead
          ? (tempListMessages[i].wasRead = false)
          : (tempListMessages[i].wasRead = true);
      }
    }
    setAllMessages(tempListMessages);
    localStorage.setItem("messages", JSON.stringify(tempListMessages));
  };

  return loggedUser == null ? (
    <div>No user Logged</div>
  ) : loggedUser.isAdmin ? (
    <div className="flex flex-col items-center">
      {/* <button onClick={handleChangeUser}>Change User</button> */}
      <div className="flex flex-col w-[80vw] mt-4">
        <div className="flex">
          <button
            onClick={handleOnClickTab}
            className={` ${
              selectedTab === "Unread" ? "bg-sky-400  font-bold" : "bg-sky-200"
            } grow h-12 rounded-t-2xl`}
          >
            Unread Messages ({getQtUnreadMessages()})
          </button>
          <button
            onClick={handleOnClickTab}
            className={` ${
              selectedTab === "Archived" ? "bg-sky-400 font-bold" : "bg-sky-200"
            } grow h-12 rounded-t-2xl`}
          >
            Archived Messages ({getQtArchivedMessages()})
          </button>
        </div>
        <div className="bg-sky-400">
          {allMessages
            .filter((message) =>
              selectedTab === "Unread" ? !message.wasRead : message.wasRead
            )
            .map((m) => (
              <div
                key={m.messageId}
                id={m.messageId}
                className="m-4 flex flex-col  w-[70vw] bg-sky-300 rounded-2xl"
              >
                <p className="m-2">
                  <b>From: </b>
                  {m.lastName + ", " + m.firstName}
                  <b> Date:</b>
                  {m.date}
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
                  id={"btn_" + m.messageId}
                  onClick={handleOnClickReadButton}
                >
                  {m.wasRead ? "Mark as Unread" : "Archive"}
                </button>
                <br></br>
              </div>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center mt-4">
      {/* <button onClick={handleChangeUser}>Change User</button> */}
      <form
        className={`${
          loggedUser.isAdmin ? "hidden" : null
        } flex flex-col rounded-xl max-w-[800px] min-w-[600px] max-h-[600px] min-h-[400px] bg-sky-200`}
      >
        <div className="my-5 text-2xl self-center">Contact us</div>
        <p className="m-4">
          {" "}
          <b>From: </b>
          {loggedUser.lastName + ", " + loggedUser.firstName}{" "}
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
    </div>
  );
};

export default Contact;
