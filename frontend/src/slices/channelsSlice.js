import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes/routes.js';

const DEFAULT_ACTIVE_CHANNEL = 1;

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (authToken) => {
    const { data } = await axios.get(routes.dataPath(), {
      headers: authToken,
    });
    return data;
  },
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
    setActiveChannel: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.activeChannelId = payload;
    },
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

export const { setActiveChannel } = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
