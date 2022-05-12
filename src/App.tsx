import React, {useEffect, useState} from 'react';
import './App.css';
import {io} from "socket.io-client";

const socket = io("http://localhost:8080");

function App() {
   const [myFormClassName, setMyFormClassName] = useState("myForm__close")
   const [myButtonClassName, setButtonClassName] = useState("myForm__open")
   const [message, setMessage] = useState("")
   const [chat, setChat] = useState<PayloadType[]>([])

   const sendChat = () => {
      // e.preventDefault();
      socket.emit("client-message-sent", { message })
      setMessage("")
   }

   function openForm() {
      setMyFormClassName("myForm__open")
      setButtonClassName("myButton__close")
   }
   function closeForm() {
      setMyFormClassName("myForm__close")
      setButtonClassName("myButton__open")
   }

   useEffect(() => {
      socket.on("client-message-sent", (payload: PayloadType) => {
         setChat([...chat, payload])
      })
   })

   useEffect(() => {
      socket.on('init-messages-loaded', (payload: PayloadType[]) => {
         setChat(payload)
      })
   }, [])

   return (
      <div className="App">

         {chat.map((payload, index) => {
            return (
               <div className="container" key={`${payload.message}-${index}`}>
                  <img src="https://www.w3schools.com/w3images/bandmember.jpg"
                       alt="Avatar"/>
                  <p>{payload.message}</p>
                  <span className="time-right">11:00</span>
               </div>
            )
         })}

         <button className="open-button" id={myButtonClassName} onClick={openForm}>Chat
         </button>

         <div className="chat-popup" id={myFormClassName}>
            <div className="form-container">
               <h1>Chat</h1>

               <label htmlFor="msg"><b>Message</b></label>
               <textarea
                  placeholder="Type message.."
                  name="msg"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.currentTarget.value)}
               />
               <button className="btn" onClick={sendChat}>Send
               </button>
               <button type="button" className="btn cancel" onClick={closeForm}>Close
               </button>
            </div>
         </div>
      </div>
   );
}

export default App;

type PayloadType = {
   message: string;
}
