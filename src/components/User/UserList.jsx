import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addChatUser } from '../../slices/chatSlice';
import { searchUsers } from '../../services/SearchService';
import '../../assets/css/styles.css';

const UserList = ({ query }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await searchUsers(query, page);
        setUsers((prevUsers) => (page === 1 ? response.data : [...prevUsers, ...response.data]));
        setHasMore(response.data.length > 0);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [query, page]);

  useEffect(() => {
    setPage(1);
    setUsers([]);
  }, [query]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 50 && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSendMessage = (user) => {
    dispatch(addChatUser(user));
    navigate('/chats', { state: { selectedUser: user } });
  };

  return (
    <div className="users-list bg-light p-3 rounded shadow h-full chat-box overflow-y-scroll" onScroll={handleScroll}>
      {users.map((user) => (
        <div key={user.id} className="p-4 m-2 bg-dark text-light rounded flex flex-space-between align-center">
          <div>
            <h3 className="text-neon text-left">{user.username} . {user.first_name} {user.last_name}</h3>
            <p className="text-left">{user.email}</p>
          </div>
          <button
            onClick={() => handleSendMessage(user)}
            className="bg-dark h-button text-light p-2 rounded shadow-neon ml-2"
          >
            Send Message
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserList;
