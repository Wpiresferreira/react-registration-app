import { useEffect, useState } from "react";
import { messagesData } from "../data/messages";

export async function GetMessages() {
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (localStorage.getItem("localMessages")) {
      localStorage.setItem("localMessages", JSON.stringify(messagesData));
    }
    setMessages(localStorage.getItem("localMessages"));
  },[]);

  return messagesData;
}
