import { configureStore } from '@reduxjs/toolkit';

import loaderSlice from '../components/UI/store/loader/loader-slice';
import clientsSlice from '../components/Clients/store/clients-slice';
import userSlice from '../components/User/store/user-slice';
import tagsSlice from '../components/Tags/store/tags-slice';
import projectsSlice from '../components/Projects/store/projects-slice';
import teamsSlice from '../components/Team/store/teams-slice';

const store = configureStore({
  reducer: {
    loader: loaderSlice.reducer,
    clients: clientsSlice.reducer,
    user: userSlice.reducer,
    tags: tagsSlice.reducer,
    projects: projectsSlice.reducer,
    teams: teamsSlice.reducer
  }
})

export default store;
