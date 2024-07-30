import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addChatUser } from '../../slices/chatSlice';
import { searchUsers } from '../../services/SearchService';
import { sendFriendRequest, getFriendRequests } from '../../services/friendService';
import '../../assets/css/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserList = ({ query }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // Add loadingMore state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends.friends);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await searchUsers(query, page);
        setUsers((prevUsers) => (page === 1 ? response.data : [...prevUsers, ...response.data]));
        setHasMore(response.data.length > 0);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error(`Error fetching users: ${error.message}`);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUsers();
  }, [query, page]);

  useEffect(() => {
    setPage(1);
    setUsers([]);
  }, [query]);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await getFriendRequests();
        setPendingRequests(response.data.filter(request => request.status === 'pending').map(request => request.receiver_id));
      } catch (error) {
        console.error('Error fetching pending friend requests:', error);
      }
    };

    fetchPendingRequests();
  }, []);

  const handleScroll = async (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 50 && hasMore && !loadingMore) {
      setLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      const fetchMoreUsers = async () => {
        try {
          const response = await searchUsers(query, page);
          setUsers((prevUsers) => [...prevUsers, ...response.data]);
          setHasMore(response.data.length > 0);
        } catch (error) {
          console.error('Error fetching more users:', error);
          toast.error(`Error fetching more users: ${error.message}`);
        } finally {
          setLoadingMore(false);
        }
      };

      fetchMoreUsers();
    }
  }, [page]);

  const handleSendMessage = (user) => {
    const isFriend = friends.some(friend => friend.friend.id === user.id);
    if (isFriend) {
      dispatch(addChatUser(user));
      navigate('/chats', { state: { selectedUser: user } });
    } else {
      toast.error('You can only send messages to your friends.');
    }
  };

  const handleAddFriend = async (user) => {
    try {
      await sendFriendRequest(user.id);
      setPendingRequests([...pendingRequests, user.id]);
      toast.success(`Friend request sent to ${user.username}`);
    } catch (error) {
      console.error('Error sending friend request:', error);
      toast.error(error.response?.data?.message || "Error sending friend request.");
    }
  };

  const isFriendOrPending = (userId) => {
    return friends.some(friend => friend.friend.id === userId) || pendingRequests.includes(userId);
  };

  return (
    <div className="users-list bg-light p-3 rounded shadow h-full chat-box overflow-y-scroll" onScroll={handleScroll}>
      <h2 className="text-neon">Users</h2>
      {users.map((user) => (
        <div key={user.id} className="p-4 m-2 bg-dark text-light rounded flex flex-space-between align-center">
          <div>
            <h3 className="text-neon text-left">{user.username} . {user.first_name} {user.last_name}</h3>
            <p className="text-left">{user.email}</p>
          </div>
          <div>
            {friends.some(friend => friend.friend.id === user.id) ? (
              <button
                onClick={() => handleSendMessage(user)}
                className="bg-dark h-button text-light p-2 rounded shadow-neon ml-2"
              >
                Send Message
              </button>
            ) : pendingRequests.includes(user.id) ? (
              <button className="bg-gray h-button text-light p-2 rounded shadow-neon ml-2" disabled>
                Request Sent
              </button>
            ) : (
              <button
                onClick={() => handleAddFriend(user)}
                className="bg-neon h-button text-dark p-2 rounded shadow-neon ml-2"
              >
                Add Friend
              </button>
            )}
          </div>
        </div>
      ))}
      {loadingMore && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default UserList;
