import { createSlice, createSelector } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    users: [],
    messages: {},
  },
  reducers: {
    setChatUsers(state, action) {
      state.users = action.payload;
    },
    addChatUser(state, action) {
      const userExists = state.users.some(user => user.id === action.payload.id);
      if (!userExists) {
        state.users.push(action.payload);
      }
    },
    setMessages(state, action) {
      const { userId, messages } = action.payload;
      state.messages[userId] = messages;
    },
    addMessage(state, action) {
      const { userId, message } = action.payload;
      if (!state.messages[userId]) {
        state.messages[userId] = [];
      }
      state.messages[userId].push(message);
    },
  },
});

export const { setChatUsers, addChatUser, setMessages, addMessage } = chatSlice.actions;

// Memoized selector
export const selectMessagesForUser = createSelector(
  (state) => state.chat.messages,
  (_, userId) => userId,
  (messages, userId) => messages[userId] || []
);

export default chatSlice.reducer;
