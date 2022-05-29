import { createSlice } from '@reduxjs/toolkit';

const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    clients: [],
    filterClients: []
  },
  reducers: {
    setClients(state, action) {
      if (!action.payload.archived && !action.payload.name) {
        state.clients = action.payload.clientsData;
      }
      state.filterClients = action.payload.clientsData;
    },
    addNewClient(state, action) {
      state.clients = [...state.clients, action.payload]
      state.filterClients = [action.payload, ...state.filterClients]
    },
    clearFilterClients(state) {
      state.filterClients = [];
    }
  }
})

export const clientsActions = clientsSlice.actions;

export default clientsSlice;
