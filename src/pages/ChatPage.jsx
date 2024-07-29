import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addChatUser } from '../slices/chatSlice';
import '../assets/css/styles.css';
import Chat from '../components/Chat/Chat';
import ChatList from '../components/Chat/ChatList';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const location = useLocation();
  const chatUsers = useSelector((state) => state.chat.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state && location.state.selectedUser) {
      const selectedUser = location.state.selectedUser;
      setSelectedChat(selectedUser);

      const userExists = chatUsers.some(user => user.id === selectedUser.id);
      if (!userExists) {
        dispatch(addChatUser(selectedUser));
      }
    }
  }, [location.state, dispatch, chatUsers]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="flex h-full">
      <ChatList className="w-25" onSelectChat={handleSelectChat} />
      <div className="flex w-75">
        {selectedChat ? (
          <Chat chat={selectedChat} />
        ) : (
          <div className="text-center p-5 w-full">
            <h2 className="text-neon">Select a chat to start messaging</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
