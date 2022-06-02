import { createSlice } from '@reduxjs/toolkit';

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: [],
    filterTags: []
  },
  reducers: {
    setTags(state, action) {
      if (!action.payload.archived && !action.payload.name) {
        state.tags = action.payload.tagsData;
      }
      state.filterTags = action.payload.tagsData;
    },
    addNewTags(state, action) {
      state.tags = [...state.tags, action.payload]
      state.filterTags = [action.payload, ...state.filterTags]
    },
    updateAnExistingTags(state, action) {
      const findTagIndexToUpdate = (tags, tagId) => tags.findIndex(tag => tag.id === tagId);

      const tagIndex = findTagIndexToUpdate(state.tags, action.payload.id);
      const filterTagIndex = findTagIndexToUpdate(state.filterTags, action.payload.id);
      state.tags[tagIndex] = action.payload;
      state.filterTags[filterTagIndex] = action.payload;
    },
    clearFilterTags(state) {
      state.tagsClients = [];
    },
    deleteTag(state, action) {
      const filterTags = (tags, id) => tags.filter(tag => tag.id !== id);
      state.tags = filterTags(state.tags, action.payload);
      state.filterTags = filterTags(state.filterTags, action.payload);
    }
  }
})

export const tagsActions = tagsSlice.actions;

export default tagsSlice;
