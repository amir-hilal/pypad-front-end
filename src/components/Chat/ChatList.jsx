import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchChatUsers } from '../../services/ChatService';
import { setChatUsers } from '../../slices/chatSlice';
import '../../assets/css/styles.css';

const ChatList = ({ onSelectChat }) => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [loading, setLoading] = useState(true);
  const chatUsers = useSelector((state) => state.chat.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const chatUsers = await fetchChatUsers();
        dispatch(setChatUsers(chatUsers));
      } catch (error) {
        console.error('Error fetching chat users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleSelectChat = (chat) => {
    setSelectedChatId(chat.id);
    onSelectChat(chat);
  };

  const handleSearchUsers = () => {
    navigate('/search');
  };

  return (
    <div className="h-75 text-light p-3 w-25 chat-users-list bl-2">
      <h2 className="text-neon">Chats</h2>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : chatUsers.length > 0 ? (
        <ul>
          {chatUsers.map((chat) => (
            <li
              key={chat.id}
              onClick={() => handleSelectChat(chat)}
              className={`p-2 cursor-pointer rounded bg-light mb-2 border border-neon  ${selectedChatId === chat.id ? 'bg-neon text-light' : 'text-dark'}`}
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
