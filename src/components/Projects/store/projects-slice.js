import { createSlice } from '@reduxjs/toolkit';

import { replacer } from '../../Utils/replacer';
import { reviver } from '../../Utils/reviver';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    defaultQueryParams: JSON.stringify(new Map([
      ['name', ''],
      ['archived', 'false'],
      ['billable', ''],
      ['clients', ''],
      ['client-status', 'ALL'],
      ['contains-client', 'true'],
      ['users', ''],
      ['user-status', 'ACTIVE'],
      ['contains-user', 'true'],
      ['sort-column', 'DURATION'],
      ['sort-order', 'DESCENDING'],
      ['page', '1'],
      ['page-size', '50']
    ]), replacer),
    newQueryParams: JSON.stringify(new Map(), replacer),
    projects: []
  },
  reducers: {
    changeNewQueryParams(state, action) {
      const queryParams = new Map(JSON.parse(state.defaultQueryParams, reviver));
      JSON.parse(action.payload, reviver).forEach((value, key) => queryParams.set(key, value));
      state.newQueryParams = JSON.stringify(queryParams, replacer);
    },
    resetNewQueryParams(state) {
      state.newQueryParams = JSON.stringify(new Map(), replacer);
    },
    setProjectsData(state, action) {
      state.projects = action.payload;
    },
    onUpdateProject(state, action) {
      const currentProjects = [...state.projects];
      const index = currentProjects.findIndex(project => project.id === action.payload.projectData.id);
      const currentProject = {...currentProjects.find(project => project.id === action.payload.projectData.id)};
      if (action.payload.type === 'archived') {
        console.log(action.payload)
        currentProject.archived = action.payload.projectData.archived;
      } else {
        currentProject.template = !action.payload.projectData.template
      }
      currentProjects[index] = currentProject;
      state.projects = currentProjects;
    },
    deleteProject(state, action) {
      state.projects = state.projects.filter(project => project.id !== action.payload);
    }
  }
})

export const projectsActions = projectsSlice.actions;

export default projectsSlice;
