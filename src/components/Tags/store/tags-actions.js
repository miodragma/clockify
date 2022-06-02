import axiosConfig from '../../../axios/axiosConfig';

import { loaderActions } from '../../UI/store/loader/loader-slice';
import { tagsActions } from './tags-slice';

export const fetchTagsData = data => {
  return async dispatch => {
    dispatch(loaderActions.setLoaderData(true));

    const {workspaceId, archived = 'false', name = ''} = data;

    let currentArchived;
    if (archived === 'empty') {
      currentArchived = ''
    } else {
      currentArchived = archived;
    }

    const fetchTags = async () => {
      return axiosConfig(`/workspaces/${workspaceId}/tags?archived=${currentArchived}&name=${name}`);
    }

    try {
      const {data: tagsData} = await fetchTags();
      dispatch(tagsActions.setTags({archived, name, tagsData}))
      dispatch(loaderActions.setLoaderData(false));
    } catch (error) {
      console.log(error);
      dispatch(loaderActions.setLoaderData(false));
    }
  }
}

export const addNewTag = data => {
  return async dispatch => {
    dispatch(loaderActions.setLoaderData(true));

    const {workspaceId, name} = data;

    const addTag = async () => {
      return axiosConfig.post(`/workspaces/${workspaceId}/tags`, {name})
    }

    try {
      const {data: newTagsData} = await addTag();
      dispatch(tagsActions.addNewTags(newTagsData))
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({toastMessage: `Tag ${newTagsData.name} has been added`, type: 'success'}))
    } catch (error) {
      console.log(error);
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({toastMessage: `${error.response.data.message}`, type: 'error'}))
    }
  }
}

export const updateTag = data => {
  return async dispatch => {
    dispatch(loaderActions.setLoaderData(true));

    const {dataToUpdate: tagData, workspaceId, tagId} = data;

    const updateTag = async () => {
      return axiosConfig.put(`/workspaces/${workspaceId}/tags/${tagId}`, tagData)
    }

    try {
      const {data: updatedTagData} = await updateTag();
      dispatch(tagsActions.updateAnExistingTags(updatedTagData))
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({toastMessage: `Tag has been added updated`, type: 'success'}))
    } catch (error) {
      console.log(error);
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({toastMessage: `${error.response.data.message}`, type: 'error'}))
    }
  }
}

export const deleteTag = data => {
  return async dispatch => {
    dispatch(loaderActions.setLoaderData(true));

    const {tagId, workspaceId} = data;

    const deleteTag = async () => {
      return axiosConfig.delete(`/workspaces/${workspaceId}/tags/${tagId}`)
    }

    try {
      const {data: deletedTag} = await deleteTag();
      dispatch(tagsActions.deleteTag(deletedTag.id))
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({
        toastMessage: `Tag with name ${deletedTag.name} has been deleted`,
        type: 'success'
      }))
    } catch (error) {
      console.log(error);
      dispatch(loaderActions.setLoaderData(false));
      dispatch(loaderActions.showToast({toastMessage: `${error.response.data.message}`, type: 'error'}))
    }
  }
}
