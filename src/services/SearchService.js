import axiosInstance from './axiosInstance';

export const searchUsers = async (query, page) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get('/search-users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      query,
      page,
    },
  });
  return response.data;
};
