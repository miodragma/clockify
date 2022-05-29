import { configureStore } from '@reduxjs/toolkit';
import loaderSlice from '../components/UI/store/loader/loader-slice';
import clientsSlice from '../components/Clients/store/clients-slice';
import userSlice from '../components/User/store/user-slice';

const store = configureStore({
  reducer: {
    loader: loaderSlice.reducer,
    clients: clientsSlice.reducer,
    user: userSlice.reducer
  }
})

export default store;
