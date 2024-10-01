import { users } from "./data";
import { messagesSample } from "./messages";

export function getLoggedUser(sessionId) {
  alert(users.filter((user) => user.userId === sessionId)[0])
  return users.filter((user) => user.userId === sessionId)[0];
}

export function getMessages() {

    let result;
    
    try{
      // alert(localStorage.getItem("messages") === undefined )

      if(localStorage.getItem("messages")){
        // alert('if')
        result = JSON.parse(localStorage.getItem("messages"))
      }else{
        result = [...messagesSample]
        localStorage.setItem("messages", JSON.stringify(messagesSample))
        // alert('else')
      }
    }catch (e){
        // result = [...messagesData]
        // localStorage.setItem("messages", JSON.stringify(messagesData))
        // alert(e.message)
    }

  for (let i = 0; i < result.length; i++) {
    let userMsg = users.filter(
      (user) => {
        // alert("user.userId === messagesData[i].userId" + " /n " + user.userId + " /n " + messagesData[i].userId)

        return user.userId === result[i].userId
      }
    );
    result[i].firstName = userMsg[0].firstName;
    result[i].lastName = userMsg[0].lastName;
  }
  return result;
}
