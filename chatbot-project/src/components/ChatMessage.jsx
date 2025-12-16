  
import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/image.png'
import dayjs from 'dayjs'
import './ChatMessage.css'
  
export function ChatMessage({message, sender,time}) {
      //const message = props.message;
      //const sender = props.sender;
      
      //const{message,sender} = props;

      // if(sender === 'robot'){
      //   return (
      //      <div>
      //       <img src="robot.png" width="50"/>
      //       {message}
      //     </div>
      //   );
      //}
      const displayTime = dayjs(time).format('h:mma');

        return (
          <div className={
            sender === 'user'
            ?'chat-message-user'
            :'chat-message-robot'
          }>
            
            {sender === 'robot' &&  (
            <img src= {RobotProfileImage} 
            className ="chat-message-profile"
            /> )}
            <div className="chat-message-text">
              {message}
              <div className='timeContainer'>
              <p
              className='time'
              >{displayTime}</p>
              </div>
            </div>
            {sender === 'user' &&  (
            <img src= {UserProfileImage}
             className ="chat-message-profile"
             />)}
          </div>
        );
     }
