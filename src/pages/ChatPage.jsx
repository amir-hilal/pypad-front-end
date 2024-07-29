import React from 'react';
import '../assets/css/styles.css';
import Chat from '../components/Chat/Chat';
import ChatList from '../components/Chat/ChatList';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = React.useState(null);

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
