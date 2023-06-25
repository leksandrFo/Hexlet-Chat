import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  id: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      const { channelId } = payload;
      // eslint-disable-next-line no-param-reassign
      state.isOpened = true;
      // eslint-disable-next-line no-param-reassign
      state.id = channelId;
    },
    closeModal: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isOpened = false;
      // eslint-disable-next-line no-param-reassign
      state.id = null;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
