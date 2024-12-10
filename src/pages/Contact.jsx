import { useEffect, useState } from "react";
import {
  deleteMessage,
  getLoggedUser,
  getMessages,
  sendMessage,
  setmessagereadstatus,
} from "../data/api";
import Alert from "../components/Alert";

export default function Contact(){
  const [loggedUser, setLoggedUser] = useState(null); // Initialize to null
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Unread");
  const [qtUnreadMessages, setQtUnreadMessages] = useState();
  const [qtArchivedMessages, setQtArchivedMessages] = useState();

  const [subject, setSubject] = useState("");
  const [bodyMessage, setBodyMessage] = useState("");

  useEffect(() => {
    // Retrieve user information using the cookie
    async function getData() {
      const res = await getLoggedUser();
      if (res.status > 201) {
        return;
      }
      setLoggedUser(res.response);
    }
    getData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!loggedUser || !loggedUser.isadmin) return;
    async function getData() {
      setAllMessages((await getMessages()).response);
    }
    getData();
  }, [loggedUser]);

  useEffect(() => {
    if (loggedUser && loggedUser.isadmin) {
      if (allMessages) {
        setQtArchivedMessages(
          !allMessages
            ? null
            : allMessages.reduce((acum, cur) => {
                if (cur.wasread) return acum + 1;
                else return acum;
              }, 0)
        );
        setQtUnreadMessages(
          !allMessages
            ? null
            : allMessages.reduce((acum, cur) => {
                if (!cur.wasread) return acum + 1;
                else return acum;
              }, 0)
        );
      }
    }
  }, [allMessages, loggedUser]);

  //variable to control state (unread ou archived TAB)
  function handleOnClickTab(e){
    setSelectedTab(e.target.innerText.split(" ")[0]);
  };

  async function handleSubmit(event){
    event.preventDefault();

    //Check and validate inputs
    if (subject.length < 1) {
      setAlertMessage("Invalid Title");
      setShowMessage(true);
      setTypeAlert("alert");
      return;
    }
    if (bodyMessage.length < 1) {
      setAlertMessage("Invalid Message");
      setShowMessage(true);
      setTypeAlert("alert");
      return;
    }

    const result = await sendMessage({
      userid: loggedUser.userid,
      titlemessage: subject,
      bodymessage: bodyMessage,
    });

    setAlertMessage(result.response.message);
    setShowMessage(true);
    if (result.status >= 200 && result.status < 400) {
      setTypeAlert("sucess");
    } else {
      setTypeAlert("alert");
    }
    console.log(result);

    setBodyMessage("");
    setSubject("");
  };
  async function handleDeleteMessage(e) {
    const result = deleteMessage(e.target.closest("button").id.split("_")[1]);
    console.log(await result);

    const tempMessages = allMessages.filter(
      (msg) =>
        msg.messageid !== Number(e.target.closest("button").id.split("_")[1])
    );
    setAllMessages(tempMessages);
  }

  function handleOnClickReadButton(e) {
    if (e.target.closest("button").innerText === "Archive") {
      setmessagereadstatus(e.target.closest("button").id.split("_")[1], true);
    } else if (e.target.closest("button").innerText === "Mark as Unread") {
      setmessagereadstatus(e.target.closest("button").id.split("_")[1], false);
    }

    const tempMessages = [...allMessages];

    for (let i = 0; i < tempMessages.length; i++) {
      if (
        tempMessages[i].messageid ===
        Number(e.target.closest("button").id.split("_")[1])
      ) {
        tempMessages[i].wasread = !tempMessages[i].wasread;
      }
    }
    setAllMessages(tempMessages);
  }

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
                    <div className="self-end flex">
                      <button
                        className={`text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
                        id={"btn_" + m.messageid}
                        onClick={handleOnClickReadButton}
                      >
                        {m.wasread ? "Mark as Unread" : "Archive"}
                      </button>
                      <button
                        className={` fa fa-trash-o text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
                        id={"btnDelete_" + m.messageid}
                        onClick={handleDeleteMessage}
                      ></button>
                    </div>
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
          className="mx-4 my-2 p-2 h-52 rounded-lg"
        ></textarea>
        <button
          className={`text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color1)] border-solid border-2 border-[var(--color1)] hover:text-[var(--color1)] hover:bg-white`}
          type="submit"
          onClick={handleSubmit}
        >
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
