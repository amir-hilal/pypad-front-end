import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import chatReducer from '../slices/chatSlice';
import friendReducer from '../slices/friendSlice';
import logger from "redux-logger";


const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    friends: friendReducer,
  },
  middleware: (getDefaultMiddlware) => {
    return getDefaultMiddlware().concat(logger);
  },
});

export default store;
