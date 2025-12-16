import {useState} from 'react'
import {Chatbot} from 'supersimpledev'
import Loading from '../assets/loading-spinner.gif'
import './ChatInput.css'

export function ChatInput({chatMessages,setChatMessages}) {
        
        const [isLoading,setIsLoading] = useState(false);
        const [inputText,setInputText] = useState('');
      
        function saveInputText(event){
          setInputText(event.target.value);
        }
        async function sendMessage(){
          setInputText('');

           if (isLoading || inputText === '') {
            return;
          }

          // Set isLoading to true at the start, and set it to
          // false after everything is done.
          setIsLoading(true);
          
          const newChatMessages = [
            ...chatMessages,
            {
              message:inputText,
              sender:'user',
              id: crypto.randomUUID()
            }
          ];

          setChatMessages(newChatMessages);

          setChatMessages([
            ...newChatMessages,
            // This creates a temporary Loading... message.
            // Because we don't save this message in newChatMessages,
            // it will be remove later, when we add the response.
            {
              message: <img 
              className = "gif"
              src={Loading}
              />,
              sender: 'robot',
              id: crypto.randomUUID()
            }
          ]);


          const response = await Chatbot.getResponseAsync(inputText);

          setChatMessages([
            ...newChatMessages,
            {
              message:response,
              sender:'robot',
              id: crypto.randomUUID()
            }
          ]);

          // Set isLoading to false after everything is done.
          setIsLoading(false);
        }

        function handleKeyDown(event){
          if(event.key === 'Enter'){
            sendMessage();
          }
          if(event.key === 'Escape'){
            setInputText('');
          }
        }

        function clearMessages(){
          setChatMessages([]);
          localStorage.clear();
        }

       return (
          <div className="chat-input-container">
            <input 
              type="text" 
              placeholder="Send a message to chatbot" 
              size="30" 
              onChange={saveInputText}
              onKeyDown={handleKeyDown}
              value={inputText}//value lets us put some value in input box
              className="chat-input"
            />
            <button
            onClick ={sendMessage}
            className="send-button"
            >Send</button>
            <button
            onClick={clearMessages}
            className='clear'
            >Clear
            </button>
          </div>
       );
     }