import axiosConfig from '../../../axios/axiosConfig';

import { loaderActions } from '../../UI/store/loader/loader-slice';
import { clientsActions } from './clients-slice';

export const fetchClientsData = data => {
  return async dispatch => {
    dispatch(loaderActions.setLoaderData(true));

    const {workspaceId, archived = 'false', name = '', page = 'clients'} = data;

    let currentArchived;
    if (archived === 'empty') {
      currentArchived = ''
    } else {
      currentArchived = archived;
    }

    const fetchClients = async () => {
      return axiosConfig(`/workspaces/${workspaceId}/clients?archived=${currentArchived}&name=${name}&page=1&page-size=50`);
    }

    try {
      const {data: clientsData} = await fetchClients();
      dispatch(clientsActions.setClients({archived, name, clientsData: clientsData, page}))
      dispatch(loaderActions.setLoaderData(false));
    } catch (error) {
      console.log(error);
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({toastMessage: `${error.response.data.message}`, type: 'error'}))
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
      const {data: newClientData} = await addClient();
      dispatch(clientsActions.addNewClient(newClientData))
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({toastMessage: `Client ${newClientData.name} has been added`, type: 'success'}))
    } catch (error) {
      console.log(error);
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({toastMessage: `${error.response.data.message}`, type: 'error'}))
    }
  }
}

export const updateClient = data => {
  return async dispatch => {
    dispatch(loaderActions.setLoaderData(true));

    const {dataToUpdate: clientData, workspaceId, clientId, isActiveProject = false} = data;

    const updateClient = async () => {
      return axiosConfig.put(`/workspaces/${workspaceId}/clients/${clientId}?active-projects=${isActiveProject}`, clientData)
    }

    try {
      const {data: updatedClientData} = await updateClient();
      dispatch(clientsActions.updateAnExistingClients(updatedClientData))
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({toastMessage: `Client has been added updated`, type: 'success'}))
    } catch (error) {
      console.log(error);
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({toastMessage: `${error.response.data.message}`, type: 'error'}))
    }
  }
}

export const deleteClient = data => {
  return async dispatch => {
    dispatch(loaderActions.setLoaderData(true));

    const {clientId, workspaceId} = data;

    const deleteClient = async () => {
      return axiosConfig.delete(`/workspaces/${workspaceId}/clients/${clientId}`)
    }

    try {
      const {data: deletedClient} = await deleteClient();
      dispatch(clientsActions.deleteClient(deletedClient.id))
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({
        toastMessage: `Client with name ${deletedClient.name} has been deleted`,
        type: 'success'
      }))
    } catch (error) {
      console.log(error);
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({toastMessage: `${error.response.data.message}`, type: 'error'}))
    }
  }
}
