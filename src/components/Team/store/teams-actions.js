import axiosConfig from '../../../axios/axiosConfig';

import { teamsActions } from './teams-slice';

import { mapQueryParams } from '../../Utils/mapQueryParams';
import { replacer } from '../../Utils/replacer';

import { loaderActions } from '../../UI/store/loader/loader-slice';

export const fetchAllUsers = data => {
  return async dispatch => {
    dispatch(loaderActions.setLoaderData(true));

    const { queryParams, workspaceId } = data;

    dispatch(teamsActions.changeNewUsersQueryParams(JSON.stringify(queryParams, replacer)));

    const fetchUsers = async () => {
      return axiosConfig(`/workspaces/${workspaceId}/users${mapQueryParams(queryParams)}`)
    }

    try {
      const { data: usersData } = await fetchUsers();
      dispatch(teamsActions.setUsers(usersData));
      dispatch(loaderActions.setLoaderData(false));
    } catch (error) {
      console.log(error);
      const message = error.response.data.code === 3000 ? 'Unexpected filter values' : `${error.response.data.message}`
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({ toastMessage: message, type: 'error' }))
    }
  }
}

export const fetchAllGroups = data => {
  return async dispatch => {
    dispatch(loaderActions.setLoaderData(true));

    const { queryParams, workspaceId } = data;
    dispatch(teamsActions.changeNewGroupsQueryParams(JSON.stringify(queryParams, replacer)));

    const fetchGroups = async () => {
      return axiosConfig(`/workspaces/${workspaceId}/user-groups${mapQueryParams(queryParams)}`)
    }

    try {
      const { data: groupsData } = await fetchGroups();
      dispatch(teamsActions.setGroups(groupsData));
      dispatch(loaderActions.setLoaderData(false));
    } catch (error) {
      console.log(error);
      const message = error.response.data.code === 3000 ? 'Unexpected filter values' : `${error.response.data.message}`
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({ toastMessage: message, type: 'error' }))
    }
  }
}

export const updateUserGroup = data => {
  /*TODO the API is missing update group userIds*/
  return async dispatch => {
    // dispatch(loaderActions.setLoaderData(true));
    //
    // const { userGroupId, workspaceId, dataUserGroup } = data;
    // console.log(dataUserGroup)
    // const fetchGroups = async () => {
    //   return axiosConfig.put(`/workspaces/${workspaceId}/user-groups/${userGroupId}`, dataUserGroup)
    // }
    //
    // try {
    //   const { data: groupData } = await fetchGroups();
    //   dispatch(teamsActions.updateGroups(groupData));
    //   dispatch(loaderActions.setLoaderData(false));
    //   dispatch(loaderActions.showToast({ toastMessage: `Access updated`, type: 'success' }))
    // } catch (error) {
    //   console.log(error);
    //   const message = error.response.data.code === 3000 ? 'Unexpected filter values' : `${error.response.data.message}`
    //   dispatch(loaderActions.setLoaderData(false));
    //   dispatch(loaderActions.showToast({ toastMessage: message, type: 'error' }))
    // }
  }
}

export const updateUserBillableRate = data => {
  return async dispatch => {
    dispatch(loaderActions.setLoaderData(true));

    const { amount, userId, workspaceId } = data;

    const updateBillableRate = async () => {
      return axiosConfig.put(`/workspaces/${workspaceId}/users/${userId}/hourly-rate`, { amount })
    }

    try {
      const { data: usersData } = await updateBillableRate();
      dispatch(teamsActions.updateBillableRate({ usersData, userIdToUpdate: userId }));
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({ toastMessage: `Billable rate has been updated`, type: 'success' }))
    } catch (error) {
      console.log(error);
      const message = error.response.data.code === 3000 ? 'Unexpected filter values' : `${error.response.data.message}`
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({ toastMessage: message, type: 'error' }))
    }
  }
}

export const addNewMember = data => {
  return async dispatch => {
    dispatch(loaderActions.setLoaderData(true));

    const { sendEmail, email, workspaceId } = data;

    const addNewMember = async () => {
      return axiosConfig.post(`/workspaces/${workspaceId}/users?sendEmail=${sendEmail}`, { email })
    }

    try {
      const { data: usersData } = await addNewMember();
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({ toastMessage: `User have been invited to workspace`, type: 'success' }))
      return usersData;
    } catch (error) {
      console.log(error);
      const message = error.response.data.code === 3000 ? 'Unexpected filter values' : `${error.response.data.message}`
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({ toastMessage: message, type: 'error' }))
      throw error;
    }
  }
}
