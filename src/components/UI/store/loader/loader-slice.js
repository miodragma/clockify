import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isLoader: false
  },
  reducers: {
    setLoaderData(state, action) {
      state.isLoader = action.payload;
    }
  }
});

export const loaderActions = loaderSlice.actions;

export default loaderSlice;
