import './App.css';
import {io} from "socket.io-client";
import React, {ChangeEvent, useEffect, useState} from 'react';

const socket = io("http://localhost:8080");

function App() {
   const [myFormClassName, setMyFormClassName] = useState("myForm__close");
   const [myButtonClassName, setButtonClassName] = useState("myForm__open");

   const [message, setMessage] = useState("");
   const [name, setName] = useState("");
   const [chat, setChat] = useState<PayloadType[]>([]);

   const sendChat = () => {
      // e.preventDefault();
      socket.emit("client-message-sent", message);
      setMessage("");
   };

   const sendName = () => {
      socket.emit("set-name-client", name);
      setName("");
   }

   const changeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)

   const openForm = () => {
      setMyFormClassName("myForm__open");
      setButtonClassName("myButton__close");
   };
   const closeForm = () => {
      setMyFormClassName("myForm__close");
      setButtonClassName("myButton__open");
   };

   useEffect(() => {
      socket.on("new-message-sent", (payload: PayloadType) => {
         setChat([...chat, payload]);
      });
   });

   useEffect(() => {
      socket.on('init-messages-loaded', (payload: PayloadType[]) => {
         setChat(payload);
         console.log(payload)
      });
   }, []);

   return (
      <div className="App">

         {chat.map((payload, index) => {
            return (
               <div className="container" key={`${payload.message}-${index}`}>
                  <img src="https://www.w3schools.com/w3images/bandmember.jpg"
                       alt="Avatar"/>
                  <h4>{payload.user.name}</h4>
                  <p>{payload.message}</p>
                  <span className="time-right">11:00</span>
               </div>
            )
         })}

         <button
            onClick={openForm}
            id={myButtonClassName}
            className="open-button"
         >
            Chat
         </button>

         <div className="chat-popup" id={myFormClassName}>
            <div className="form-container">
               <h1>Chat</h1>

               <label htmlFor="msg"><b>Message</b></label>
               <textarea
                  required
                  name="msg"
                  value={message}
                  placeholder="Type message.."
                  onChange={(e) => setMessage(e.currentTarget.value)}
               />
               <div style={{marginBottom: "20px"}}>
                  <input
                     style={{marginRight: "20px"}}
                     type="text"
                     value={name}
                     onChange={changeName}
                  />
                  <button onClick={sendName}>Set Name</button>
               </div>

               <button className="btn" onClick={sendChat}>Send</button>
               <button
                  type="button"
                  onClick={closeForm}
                  className="btn cancel"
               >
                  Close
               </button>
            </div>
         </div>
      </div>
   );
}

export default App;

type PayloadType = {
   message: string;
   user: {
      id: string;
      name: string;
   }
}
