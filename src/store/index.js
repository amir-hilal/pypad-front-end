import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import chatReducer from '../slices/chatSlice';
import friendReducer from '../slices/friendSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    friends: friendReducer,
  },
});

export default store;
