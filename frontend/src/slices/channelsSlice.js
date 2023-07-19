import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverRoutes } from '../routes/routes.js';

const DEFAULT_ACTIVE_CHANNEL = 1;

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (authHeader) => {
    const { data } = await axios.get(serverRoutes.dataPath(), {
      headers: authHeader,
    });
    return data;
  },
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    setActiveChannel: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.activeChannelId = payload;
    },
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, { payload }) => {
      const { id } = payload;
      channelsAdapter.removeOne(state, id);
      if (state.activeChannelId === id) {
        // eslint-disable-next-line no-param-reassign, prefer-destructuring
        state.activeChannelId = DEFAULT_ACTIVE_CHANNEL;
      }
    },
    renameChannel: channelsAdapter.setOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        channelsAdapter.setAll(state, payload.channels);
        // eslint-disable-next-line no-param-reassign
        state.activeChannelId = DEFAULT_ACTIVE_CHANNEL;
      });
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
