import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
// import messagesReducer from '../slices/messagesSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    // messages: messagesReducer,
  },
});
