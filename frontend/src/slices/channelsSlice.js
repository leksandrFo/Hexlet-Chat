import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes/routes.js';

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

const channelSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, channelsAdapter.setAll);
  },
});

export const { action } = channelSlice;
export default channelSlice.reducer;
