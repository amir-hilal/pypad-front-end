import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, sendMessage } from '../../services/ChatService';
import { addMessage, setMessages, selectMessagesForUser } from '../../slices/chatSlice';
import '../../assets/css/styles.css';
import image from '../../assets/images/image.png';

const Chat = ({ chat }) => {
  const [newMessage, setNewMessage] = useState('');
  const messages = useSelector((state) => selectMessagesForUser(state, chat.id));
  const dispatch = useDispatch();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const messages = await fetchMessages(chat.id);
        dispatch(setMessages({ userId: chat.id, messages }));
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    getMessages();
  }, [chat, dispatch]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const message = await sendMessage(chat.id, newMessage);
      dispatch(addMessage({ userId: chat.id, message }));
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);
    if (e.target.value.trim()) {
      e.target.classList.add('has-text');
    } else {
      e.target.classList.remove('has-text');
    }
  };

  const currentUserId = parseInt(localStorage.getItem('userId'));

  return (
    <div className="bg-light text-dark  h-full w-full flex flex-column">
      <div className='flex bb-3 w-full align-center'>
        <img src={image} width={60} height={60} className='circle m-2' alt="Chat" />
        <h2 className="text-dark bg-light  m-0 p-4 w-full">{chat.username}</h2>
      </div>
      <div className="chat-box h-full flex flex-column w-full">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-2 m-1 rounded shadow w-75 ${parseInt(message.sender_id) === currentUserId ? 'bg-sender text-light align-right' : 'bg-receiver text-light align-left'}`}
          >
            <p className='m-1'>{message.message}</p>
            <p className=" m-1 ts-small text-shady">{new Date(message.created_at).toLocaleTimeString()}</p>
          </div>
        ))}
      </div>
      <div className=" p-4 flex align-center mt-2">
        <input
          type="text"
          value={newMessage}
          onChange={handleChange}
          placeholder="Type your message..."
          className="opc-5 send-message border border-light-gray p-2 w-full rounded"
        />
        <button onClick={handleSendMessage} className="bg-neon border-light-gray text-light p-2 rounded shadow-neon ml-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
