import axiosConfig from '../../../axios/axiosConfig';

import { teamsActions } from './teams-slice';

import { mapQueryParams } from '../../Utils/mapQueryParams';
import { replacer } from '../../Utils/replacer';

import { loaderActions } from '../../UI/store/loader/loader-slice';

export const fetchAllUsers = data => {
  return async dispatch => {
    dispatch(loaderActions.setLoaderData(true));

    const {queryParams, workspaceId} = data;

    dispatch(teamsActions.changeNewUsersQueryParams(JSON.stringify(queryParams, replacer)));

    const fetchUsers = async () => {
      return axiosConfig(`/workspaces/${workspaceId}/users${mapQueryParams(queryParams)}`)
    }

    try {
      const {data: usersData} = await fetchUsers();
      dispatch(teamsActions.setUsers(usersData));
      dispatch(loaderActions.setLoaderData(false));
    } catch (error) {
      console.log(error);
      const message = error.response.data.code === 3000 ? 'Unexpected filter values' : `${error.response.data.message}`
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({toastMessage: message, type: 'error'}))
    }
  }
}

export const fetchAllGroups = data => {
  return async dispatch => {
    dispatch(loaderActions.setLoaderData(true));

    const {queryParams, workspaceId} = data;
    dispatch(teamsActions.changeNewGroupsQueryParams(JSON.stringify(queryParams, replacer)));

    const fetchUsers = async () => {
      return axiosConfig(`/workspaces/${workspaceId}/user-groups${mapQueryParams(queryParams)}`)
    }

    try {
      const {data: groupsData} = await fetchUsers();
      dispatch(teamsActions.setGroups(groupsData));
      dispatch(loaderActions.setLoaderData(false));
    } catch (error) {
      console.log(error);
      const message = error.response.data.code === 3000 ? 'Unexpected filter values' : `${error.response.data.message}`
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({toastMessage: message, type: 'error'}))
    }
  }
}
