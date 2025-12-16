import  { useRef,useEffect } from 'react'
import { ChatMessage } from './ChatMessage';
import dayjs from 'dayjs';
import './ChatMessages.css';//vite automatically applies this css to this file
      
      function ChatMessages({chatMessages}){

       const chatMessageRef = useAutoScroll([chatMessages]);
       const time = dayjs().valueOf();
        
      return (
      <div 
      className ="chat-messages-container"
      ref={chatMessageRef}>
        {chatMessages.map((chatMsg) => {
            return (
              <ChatMessage 
                message={chatMsg.message} 
                sender={chatMsg.sender}
                time = {time}
                key={chatMsg.id}
              />
            );
          })}
     </div>
        );
      }

      function useAutoScroll(dependencies) //custom state
      {
        const containerRef = useRef(null);

        useEffect(
          () => {
            const containerElem = containerRef.current;
            if(containerElem){
              containerElem.scrollTop = containerElem.scrollHeight;
            }
          },
          [dependencies]
        );

        return containerRef;
      }

      export default ChatMessages;