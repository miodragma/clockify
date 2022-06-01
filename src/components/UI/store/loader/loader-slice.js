import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { toastConfig } from '../../Toast/Toast';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isLoader: false
  },
  reducers: {
    setLoaderData(state, action) {
      state.isLoader = action.payload;
    },
    showToast(state, action) {
      switch (action.payload.type) {
        case 'success':
          toast.success(action.payload.toastMessage, {...toastConfig})
          break;
        case 'error':
          toast.error(action.payload.toastMessage, {...toastConfig})
          break;
        default:
          return;
      }
    },
  }
});

export const loaderActions = loaderSlice.actions;

export default loaderSlice;
