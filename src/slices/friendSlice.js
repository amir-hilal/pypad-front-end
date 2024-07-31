import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFriends, getFriendRequests, acceptFriendRequest, rejectFriendRequest } from '../services/friendService';

export const fetchAllFriends = createAsyncThunk('friends/fetchAllFriends', async () => {
  const response = await getFriends();
  return response;
});

export const fetchAllFriendRequests = createAsyncThunk('friends/fetchAllFriendRequests', async () => {
  const response = await getFriendRequests();
  return response;
});

export const acceptRequest = createAsyncThunk('friends/acceptRequest', async (requestId, { getState }) => {
  const response = await acceptFriendRequest(requestId);
  const state = getState();
  const acceptedRequest = state.friends.friendRequests.find(request => request.id === requestId);
  return { id: requestId, friend: acceptedRequest };
});

export const rejectRequest = createAsyncThunk('friends/rejectRequest', async (requestId) => {
  const response = await rejectFriendRequest(requestId);
  return { id: requestId };
});

const friendSlice = createSlice({
  name: 'friends',
  initialState: {
    friends: [],
    friendRequests: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFriends.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = action.payload;
      })
      .addCase(fetchAllFriends.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchAllFriendRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllFriendRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.friendRequests = action.payload;
      })
      .addCase(fetchAllFriendRequests.rejected, (state) => {
        state.loading = false;
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        const { id, friend } = action.payload;
        state.friendRequests = state.friendRequests.filter(request => request.id !== id);
        state.friends.push(friend);
      })
      .addCase(rejectRequest.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.friendRequests = state.friendRequests.filter(request => request.id !== id);
      });
  },
});

export default friendSlice.reducer;
