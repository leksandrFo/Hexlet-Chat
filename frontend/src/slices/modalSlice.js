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
      // eslint-disable-next-line no-param-reassign
      state.operation = operation;
      // eslint-disable-next-line no-param-reassign
      state.isOpened = true;
      // eslint-disable-next-line no-param-reassign
      state.channelData = channelData;
    },
    closeModal: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isOpened = false;
    },
  },
});

export const { actions } = modalSlice;
// export const selectors = {
//   operation: (state) => state.modals.operation,
//   id: (state) => state.modals.id,
//   isOpened: (state) => state.modals.isOpened,
// };
export default modalSlice.reducer;
