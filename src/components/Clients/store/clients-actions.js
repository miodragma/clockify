import axiosConfig from '../../../axios/axiosConfig';

import { loaderActions } from '../../UI/store/loader/loader-slice';
import { clientsActions } from './clients-slice';

export const fetchClientsData = data => {
  return async dispatch => {
    dispatch(loaderActions.setLoaderData(true));

    const {workspaceId, archived = 'false', name = ''} = data;

    const fetchClients = async () => {
      return axiosConfig(`/workspaces/${workspaceId}/clients?archived=${archived}&name=${name}`);
    }

    try {
      const clientsData = await fetchClients();
      dispatch(clientsActions.setClients({archived, name, clientsData: clientsData.data}))
      dispatch(loaderActions.setLoaderData(false));
    } catch (error) {
      console.log(error);
      dispatch(loaderActions.setLoaderData(false));
    }
  }
}

export const addNewClient = data => {
  return async dispatch => {
    dispatch(loaderActions.setLoaderData(true));

    const {workspaceId, name} = data;

    const addClient = async () => {
      return axiosConfig.post(`/workspaces/${workspaceId}/clients`, {name})
    }

    try {
      const newClientData = await addClient();
      dispatch(clientsActions.addNewClient(newClientData.data))
      dispatch(loaderActions.setLoaderData(false));
    } catch (error) {
      console.log(error);
      dispatch(loaderActions.setLoaderData(false));
    }
  }
}
