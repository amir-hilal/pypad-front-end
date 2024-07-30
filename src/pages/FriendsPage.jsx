import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFriends, fetchAllFriendRequests, acceptRequest, rejectRequest } from '../slices/friendSlice';
import { addChatUser } from '../slices/chatSlice';
import { useNavigate } from 'react-router-dom';
import '../assets/css/styles.css';

const FriendsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const friends = useSelector((state) => state.friends.friends);
  const friendRequests = useSelector((state) => state.friends.friendRequests);
  const loading = useSelector((state) => state.friends.loading);

  useEffect(() => {
    dispatch(fetchAllFriends());
    dispatch(fetchAllFriendRequests());
  }, [dispatch]);

  const handleAccept = (requestId) => {
    dispatch(acceptRequest(requestId));
  };

  const handleReject = (requestId) => {
    dispatch(rejectRequest(requestId));
  };

  const handleSendMessage = (friend) => {
    dispatch(addChatUser(friend.friend));
    navigate('/chats', { state: { selectedUser: friend.friend } });
  };

  return (
    <div className="bg-light p-5 text-center min-h-75">
      <h1 className="text-neon">Friends</h1>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="flex flex-space-around">
          <div className="w-50 p-2">
            <h2 className="text-neon">Friends</h2>
            {friends.length === 0 ? (
              <p>No friends found.</p>
            ) : (
              friends.map((friend) => (
                <div key={friend.id} className="p-2 m-2 bg-dark text-light rounded flex flex-space-between align-center">
                  <div className='m-4'>
                    <h3 className="text-neon text-left m-0">{friend.friend.username} . {friend.friend.first_name} {friend.friend.last_name}</h3>
                    <p className='text-left'>{friend.friend.email}</p>
                  </div>
                  <button
                    onClick={() => handleSendMessage(friend)}
                    className="bg-dark h-button text-light p-2 rounded shadow-neon mr-3 w-min-130"
                  >
                    Send Message
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="w-50 p-2">
            <h2 className="text-neon">Friend Requests</h2>
            {friendRequests.length === 0 ? (
              <p>No friend requests found.</p>
            ) : (
              friendRequests.map((request) => (
                <div key={request.id} className="p-2 m-2 bg-dark text-light rounded flex justify-between items-center">
                  <div className='m-4'>
                    <h3 className="text-neon text-left">{request.sender.username} . {request.sender.first_name} {request.sender.last_name}</h3>
                    <p className='text-left'>{request.sender.email}</p>
                  </div>
                  <div className='flex align-center'>
                    <button className="bg-neon text-dark p-2 m-2 rounded shadow-neon ml-2" onClick={() => handleAccept(request.id)}>Accept</button>
                    <button className="bg-dark text-light p-2 m-2 rounded shadow-neon ml-2" onClick={() => handleReject(request.id)}>Reject</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
