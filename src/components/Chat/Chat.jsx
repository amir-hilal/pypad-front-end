import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import '../../assets/css/styles.css';

const Chat = ({ chat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/chats/${chat.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [chat]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://127.0.0.1:8000/api/chats',
        {
          receiver_id: chat.id,
          message: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const currentUserId = parseInt(decodedToken.sub); // Assuming the user ID is stored in the 'sub' claim and converting it to an integer

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
