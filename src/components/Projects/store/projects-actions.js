import { loaderActions } from '../../UI/store/loader/loader-slice';
import axiosConfig from '../../../axios/axiosConfig';
import { projectsActions, replacer } from './projects-slice';
import { mapQueryParams } from '../../Utils/mapQueryParams';

export const fetchProjectsData = data => {
  return async dispatch => {
    dispatch(loaderActions.setLoaderData(true));

    const {queryParams, workspaceId} = data;
    dispatch(projectsActions.changeNewQueryParams(JSON.stringify(queryParams, replacer)));

    const updateQueryParams = new Map(queryParams);
    updateQueryParams.set('hydrated', true);

    const fetchProjects = async () => {
      return axiosConfig(`/workspaces/${workspaceId}/projects${mapQueryParams(updateQueryParams)}`)
    }

    try {
      const {data: projectsData} = await fetchProjects();
      dispatch(projectsActions.setProjectsData(projectsData));
      dispatch(loaderActions.setLoaderData(false));
    } catch (error) {
      console.log(error);
      const message = error.response.data.code === 3000 ? 'Unexpected filter values' : `${error.response.data.message}`
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({toastMessage: message, type: 'error'}))
    }
  }
}

export const updateProjectArchive = data => {
  return async dispatch => {

    dispatch(loaderActions.setLoaderData(true));

    const {archived, workspaceId, id: projectId, template} = data.data;


    const updateProject = async () => {
      if (data.actionType === 'archived') {
        return axiosConfig.put(`workspaces/${workspaceId}/projects/${projectId}`, {archived: !archived})
      }
      return axiosConfig.patch(`/workspaces/${workspaceId}/projects/${projectId}/template`, {isTemplate: !template})
    }

    try {
      const {data: projectData} = await updateProject();
      dispatch(loaderActions.setLoaderData(false));
      dispatch(projectsActions.onUpdateProject({type: data.actionType, projectData}))
      dispatch(loaderActions.showToast({toastMessage: `Project successfully updated`, type: 'success'}))
    } catch (error) {
      console.log(error);
      const message = error.response.data.message || 'Please contact support'
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({toastMessage: message, type: 'error'}))
    }
  }
}

export const deleteProject = data => {
  return async dispatch => {

    dispatch(loaderActions.setLoaderData(true));

    const {id: projectId, workspaceId} = data;

    const deleteProject = async () => {
      return axiosConfig.delete(`/workspaces/${workspaceId}/projects/${projectId}`);
    }

    try {
      const {data: projectData} = await deleteProject();
      dispatch(loaderActions.setLoaderData(false));
      dispatch(projectsActions.deleteProject(projectData.id));
      dispatch(loaderActions.showToast({toastMessage: `Project successfully deleted`, type: 'success'}));
    } catch (error) {
      console.log(error);
      const message = error.response.data.message || 'Please contact support'
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({toastMessage: message, type: 'error'}))
    }
  }
}
