import './App.css';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {
   createConnection,
   destroyConnection,
   MessageType, sendMessage, sendName
} from "../store/chat/chatReducer";
import {useAppDispatch, useAppSelector} from "../store/store";


function App() {
   const dispatch = useAppDispatch()
   const messages = useAppSelector<MessageType[]>(state => state.chat.messages)

   const [myFormClassName, setMyFormClassName] = useState("myForm__close");
   const [myButtonClassName, setButtonClassName] = useState("myForm__open");

   const [message, setMessage] = useState("");
   const [name, setName] = useState("");

   const sendMessageHandle = () => {
      dispatch(sendMessage(message))
      setMessage("");
   };

   const sendNameHandle = () => {
      dispatch(sendName(name))
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
      dispatch(createConnection())
      return () => dispatch(destroyConnection())
   }, []);

   return (
      <div className="App">

         {messages.map((message, index) => {
            return (
               <div className="container" key={`${message.message}-${index}`}>
                  <img src="https://www.w3schools.com/w3images/bandmember.jpg"
                       alt="Avatar"/>
                  <h4>{message.user.name}</h4>
                  <p>{message.message}</p>
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
                  <button onClick={sendNameHandle}>Set Name</button>
               </div>

               <button className="btn" onClick={sendMessageHandle}>Send</button>
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
