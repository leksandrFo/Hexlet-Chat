import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchChannels, actions as channelsActions } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        const { messages } = payload;
        messagesAdapter.setAll(state, messages);
      })
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        const { id } = payload;
        const remainingMessages = Object.values(state.entities)
          .filter((message) => message.channelId !== id);
        messagesAdapter.setAll(state, remainingMessages);
      });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
