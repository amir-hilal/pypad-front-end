import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/styles.css';

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/chat-users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chat users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatUsers();
  }, []);

  const handleSelectChat = (chat) => {
    setSelectedChatId(chat.id);
    onSelectChat(chat);
  };

  const handleSearchUsers = () => {
    navigate('/search');
  };

  return (
    <div className="bg-light-gray h-75 text-light p-3 w-25 chat-users-list">
      <h2 className="text-neon">Chats</h2>
      {loading ? (
        <div className="text-center">
          <p className="text-light p-3">Loading...</p>
        </div>
      ) : chats.length > 0 ? (
        <ul>
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => handleSelectChat(chat)}
              className={`p-2 m-1 cursor-pointer rounded bg-light text-dark ${selectedChatId === chat.id ? 'bg-neon' : ''}`}
            >
              {chat.username}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center">
          <p className="text-light p-3">No chats available yet.</p>
          <button className="bg-neon text-dark p-2 rounded shadow-neon" onClick={handleSearchUsers}>
            Find Friends to Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatList;
