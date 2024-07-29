import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, sendMessage } from '../../services/ChatService';
import { addMessage, setMessages, selectMessagesForUser } from '../../slices/chatSlice';
import '../../assets/css/styles.css';

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

  const currentUserId = parseInt(localStorage.getItem('userId')); // Get the current user ID from local storage

  return (
    <div className="bg-light text-dark p-3 h-full w-full flex flex-column">
      <h2 className="text-neon">{chat.username}</h2>
      <div className="chat-box h-full flex flex-column w-full">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-2 m-1 rounded shadow w-75 ${parseInt(message.sender_id) === currentUserId ? 'bg-sender text-dark align-right' : 'bg-receiver text-light align-left'}`}
          >
            <p>{message.message}</p>
            <small className="text-muted">{new Date(message.created_at).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
      <div className="flex align-center mt-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="p-2 w-full rounded"
        />
        <button onClick={handleSendMessage} className="bg-neon text-dark p-2 rounded shadow-neon ml-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
