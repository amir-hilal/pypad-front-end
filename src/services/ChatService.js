import axiosInstance from './axiosInstance';

export const fetchChatUsers = async () => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get('/chat-users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchMessages = async (userId) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get(`/chats/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const sendMessage = async (receiverId, message) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.post(
    '/chats',
    { receiver_id: receiverId, message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
