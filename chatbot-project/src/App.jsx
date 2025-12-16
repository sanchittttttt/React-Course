import { useEffect, useState} from 'react'
import {ChatInput} from './components/ChatInput'
import {Chatbot} from 'supersimpledev'
import ChatMessages from './components/ChatMessages';//default export
import './App.css'

function App(){

          const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);

      //  const chatMessages = array[0]; //current state value
      //  const setChatMessages = array[1]; //set state function

       //const[chatMessages,setChatMessages] = array; //shortcut for above 2 lines
      //instead of writing above 3 lines we directly destructure the array returned by useState

        useEffect(
          ()=>{
             Chatbot.addResponses(
            {
               'goodbye': 'Goodbye. Have a great day!',
               'swear': 'Fuck You!'
            }
          )
          }
          ,[]
        );

        useEffect(
          ()=>{
            localStorage.setItem('messages',JSON.stringify(chatMessages));
          },[chatMessages]
        );

        return(
              <div className="app-container">
                {chatMessages.length === 0 &&
                  (
                    <p
                    className = "welcome"
                    >Welcome to chatbot!</p>
                  )
                }
                <ChatMessages  
                chatMessages = {chatMessages}
                />
                <ChatInput 
                chatMessages = {chatMessages}
                setChatMessages = {setChatMessages}
                />
              </div>
            );
     }

export default App
