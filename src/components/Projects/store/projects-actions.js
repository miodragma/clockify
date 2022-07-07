import axiosConfig from '../../../axios/axiosConfig';
import { projectsActions } from './projects-slice';

import { mapQueryParams } from '../../Utils/mapQueryParams';
import { replacer } from '../../Utils/replacer';

import { loaderActions } from '../../UI/store/loader/loader-slice';

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

export const addNewProject = data => {
  return async dispatch => {

    const {workspaceId, projectData} = data;

    dispatch(loaderActions.setLoaderData(true));

    const addNewProject = async () => {
      return axiosConfig.post(`/workspaces/${workspaceId}/projects`, projectData)
    }

    try {
      const {data: projectsData} = await addNewProject();
      dispatch(projectsActions.addNewProject(projectsData));
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({
        toastMessage: `Project ${projectData.name} has been created`,
        type: 'success'
      }))
    } catch (error) {
      console.log(error);
      const message = error.response.data.code === 3000 ? 'Unexpected filter values' : `${error.response.data.message}`
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({toastMessage: message, type: 'error'}))
    }

  }
}

export const updateProject = data => {
  return async dispatch => {

    dispatch(loaderActions.setLoaderData(true));

    const { dataToUpdate, workspaceId, id: projectId, template, actionType } = data;

    const updateProject = async () => {
      if (actionType === 'template') {
        return axiosConfig.patch(`/workspaces/${workspaceId}/projects/${projectId}/template`, { isTemplate: !template })
      }
      return axiosConfig.put(`workspaces/${workspaceId}/projects/${projectId}`, dataToUpdate)
    }

    try {
      const {data: projectData} = await updateProject();
      dispatch(loaderActions.setLoaderData(false));
      dispatch(projectsActions.onUpdateProject(projectData))
      dispatch(loaderActions.showToast({ toastMessage: `Project successfully updated`, type: 'success' }))
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

export const fetchProjectById = data => {
  return async dispatch => {
    dispatch(loaderActions.setLoaderData(true));

    const {projectId, workspaceId} = data;

    const fetchProject = async () => {
      return axiosConfig(`/workspaces/${workspaceId}/projects/${projectId}?hydrated=true`)
    }

    try {
      const { data: projectData } = await fetchProject();
      dispatch(projectsActions.setProject(projectData));
      dispatch(loaderActions.setLoaderData(false));
    } catch (error) {
      console.log(error);
      const message = error.response.data.code === 3000 ? 'Unexpected filter values' : `${error.response.data.message}`
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({ toastMessage: message, type: 'error' }))
    }
  }
}

export const addNewTask = data => {
  return async dispatch => {
    dispatch(loaderActions.setLoaderData(true));

    const { projectId, workspaceId, taskName } = data;

    const addTask = async () => {
      return axiosConfig.post(`/workspaces/${workspaceId}/projects/${projectId}/tasks`, { name: taskName })
    }

    try {
      const { data: taskData } = await addTask();
      dispatch(projectsActions.addNewTask(taskData));
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({ toastMessage: `Task ${taskName} has been created`, type: 'success' }))
    } catch (error) {
      console.log(error);
      const message = error.response.data.code === 3000 ? 'Unexpected filter values' : `${error.response.data.message}`
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({ toastMessage: message, type: 'error' }))
    }
  }
}

export const editTask = data => {
  return async dispatch => {
    dispatch(loaderActions.setLoaderData(true));

    const { projectId, workspaceId, taskData, taskId } = data;

    const editTask = async () => {
      return axiosConfig.put(`/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`, taskData)
    }

    try {
      const { data: taskData } = await editTask();
      dispatch(projectsActions.editTask(taskData));
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({ toastMessage: `Task ${taskData.name} has been updated`, type: 'success' }))
    } catch (error) {
      console.log(error);
      const message = error.response.data.code === 3000 ? 'Unexpected filter values' : `${error.response.data.message}`
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({ toastMessage: message, type: 'error' }))
    }
  }
}

export const deleteTask = data => {
  return async dispatch => {

    dispatch(loaderActions.setLoaderData(true));

    const { projectId, workspaceId, taskId } = data;

    const deleteTask = async () => {
      return axiosConfig.delete(`/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`);
    }

    try {
      const { data: taskData } = await deleteTask();
      dispatch(loaderActions.setLoaderData(false));
      dispatch(projectsActions.deleteTask(taskData.id));
      dispatch(loaderActions.showToast({ toastMessage: `Task ${taskData.name} has been deleted`, type: 'success' }));
    } catch (error) {
      console.log(error);
      const message = error.response.data.message || 'Please contact support'
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({ toastMessage: message, type: 'error' }))
    }
  }
}
