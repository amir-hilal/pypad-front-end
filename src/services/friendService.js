import axiosInstance from './axiosInstance';

export const getFriends = async () => {
  const response = await axiosInstance.get('/friends');
  return response.data;
};

export const getFriendRequests = async () => {
  const response = await axiosInstance.get('/friend-requests');
  return response.data;
};

export const sendFriendRequest = async (userId) => {
  const response = await axiosInstance.post(
    '/friend-requests',
    { receiver_id: userId },
  );
  return response.data;
};

export const acceptFriendRequest = async (requestId) => {
  const response = await axiosInstance.post(`/friend-requests/${requestId}/accept`);
  return response.data;
};

export const rejectFriendRequest = async (requestId) => {
  const response = await axiosInstance.post(`/friend-requests/${requestId}/reject`);
  return response.data;
};

