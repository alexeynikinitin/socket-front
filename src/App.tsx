import React, {useState} from 'react';
import './App.css';

function App() {
   const [myFormClassName, setMyFormClassName] = useState("myForm__close")
   const [myButtonClassName, setButtonClassName] = useState("myForm__open")
   function openForm() {
      setMyFormClassName("myForm__open")
      setButtonClassName("myButton__close")
   }

   function closeForm() {
      setMyFormClassName("myForm__close")
      setButtonClassName("myButton__open")
   }

   return (
      <div className="App">
         <div className="container">
            <img src="https://www.w3schools.com/w3images/bandmember.jpg" alt="Avatar"/>
               <p>Hello. How are you today?</p>
               <span className="time-right">11:00</span>
         </div>

         <div className="container darker">
            <img src="https://www.w3schools.com/w3images/avatar_g2.jpg" alt="Avatar" className="right"/>
               <p>Hey! I'm fine. Thanks for asking!</p>
               <span className="time-left">11:01</span>
         </div>

         <button className="open-button" id={myButtonClassName} onClick={openForm}>Chat</button>

         <div className="chat-popup" id={myFormClassName}>
            <form action="#" className="form-container">
               <h1>Chat</h1>

               <label htmlFor="msg"><b>Message</b></label>
               <textarea placeholder="Type message.." name="msg" required/>

               <button type="submit" className="btn">Send</button>
               <button type="button" className="btn cancel" onClick={closeForm}>Close
               </button>
            </form>
         </div>
      </div>
);
}

export default App;
