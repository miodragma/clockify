import { createSlice } from '@reduxjs/toolkit';

const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    clients: [],
    filterClients: [],
    filterProjectClients: []
  },
  reducers: {
    setClients(state, action) {
      if (!action.payload.archived && !action.payload.name) {
        state.clients = action.payload.clientsData;
      }
      if (action.payload.page === 'projects') {
        state.filterProjectClients = action.payload.clientsData;
      } else {
        state.filterClients = action.payload.clientsData;
      }
    },
    addNewClient(state, action) {
      state.clients = [...state.clients, action.payload]
      state.filterClients = [action.payload, ...state.filterClients]
    },
    updateAnExistingClients(state, action) {
      const findClientIndexToUpdate = (clients, clientId) => clients.findIndex(client => client.id === clientId);

      const clientIndex = findClientIndexToUpdate(state.clients, action.payload.id);
      const filterClientIndex = findClientIndexToUpdate(state.filterClients, action.payload.id);
      state.clients[clientIndex] = action.payload;
      state.filterClients[filterClientIndex] = action.payload;
    },
    clearFilterClients(state) {
      state.filterClients = [];
    },
    deleteClient(state, action) {
      const filterClients = (clients, id) => clients.filter(client => client.id !== id);
      state.clients = filterClients(state.clients, action.payload);
      state.filterClients = filterClients(state.filterClients, action.payload);
    }
  }
})

export const clientsActions = clientsSlice.actions;

export default clientsSlice;
