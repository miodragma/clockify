import { createSlice } from '@reduxjs/toolkit';

export const replacer = (key, value) => {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from([...value])
    };
  } else {
    return value;
  }
};

export const reviver = (key, value) => {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    defaultQueryParams: JSON.stringify(new Map([
      ['archived', 'ACTIVE'],
      ['billable', 'NONE'],
      ['containsClient', 'true'],
      ['containsUser', 'true'],
      ['sortColumn', 'DURATION'],
      ['sortOrder', 'DESCENDING']
    ]), replacer),
    newQueryParams: JSON.stringify(new Map(), replacer)
  },
  reducers: {
    changeNewQueryParams(state, action) {
      const queryParams = new Map(JSON.parse(state.defaultQueryParams, reviver));
      JSON.parse(action.payload, reviver).forEach((value, key) => queryParams.set(key, value));
      state.newQueryParams = JSON.stringify(queryParams, replacer);
    },
    resetNewQueryParams(state) {
      state.newQueryParams = JSON.stringify(new Map(), replacer);
    }
  }
})

export const projectsActions = projectsSlice.actions;

export default projectsSlice;
