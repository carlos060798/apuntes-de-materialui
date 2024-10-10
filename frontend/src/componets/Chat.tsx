import MessagesList from './MessagesList.tsx';
import MessageInput from './MessagesList.tsx';
import { useChatHistory } from '../sockets-client/hook/useChatHystory.ts';



const Chat = (channelid:string) => {
  const {messages, sendMessage}= useChatHistory(channelid)

const   datamesagges = [
  { user: 'User 1', text: 'Hello, how are you?' },
  { user: 'User 2', text: 'I\'m doing well, thank you!' },
  { user: 'User 1', text: 'How about you?' },
  { user: 'User 2', text: 'I\'m also doing well, thank you!' },
  { user: 'User 1', text: 'What is your name?' },
  { user: 'User 2', text: 'My name is User 2' },
  // Add more messages here...
]
  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 border-end">
          <h5>Channel is offline</h5>
          <MessageInput setMessages={sendMessage} />
        </div>
        <div className="col-md-4">
          <h5>Stream Chat</h5>
          <MessagesList messages={datamesagges} />
        </div>
      </div>
    </div>
  );
};

export default Chat;

/*

function  ChatApp(channelid:string) {
  const {messages,  setMessages}= useChatHistory(channelid)



  return (
    <div className="container d-flex flex-column" style={{ height: '100vh' }}>
      <h3 className="text-center text-light bg-dark py-2">Chat estilo Twitch</h3>
      <div className="flex-grow-1 bg-dark p-3 rounded">
        <MessagesList messages={[]} />
      </div>
      <div className="mt-auto">
        <MessageInput  setMessages={()=>{}} />
      </div>
    </div>
  );
};

export default ChatApp;
*/