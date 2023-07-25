/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  operation: null,
  isOpened: false,
  channelData: {
    id: null,
    name: null,
  },
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      const { operation, channelData } = payload;
      state.operation = operation;
      state.isOpened = true;
      state.channelData = channelData;
    },
    closeModal: (state) => {
      state.isOpened = false;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
