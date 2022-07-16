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
      ['user-status', 'ALL'],
      ['contains-user', 'true'],
      ['sort-column', 'BUDGET'],
      ['sort-order', 'DESCENDING'],
      ['page', '1'],
      ['page-size', '50']
    ]), replacer),
    newQueryParams: JSON.stringify(new Map(), replacer),
    projects: [],
    project: {},
    tasks: []
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
    addNewProject(state, action) {
      state.projects = [action.payload, ...state.projects]
    },
    onUpdateProject(state, action) {
      const currentProjects = [...state.projects];
      const index = currentProjects.findIndex(project => project.id === action.payload.projectData.id);
      let currentProject = { ...currentProjects.find(project => project.id === action.payload.projectData.id) };
      currentProject = { ...currentProject, ...action.payload.projectData }
      currentProjects[index] = currentProject;
      state.projects = currentProjects;

      const singleProject = { ...state.project };
      action.payload.singleProjectKeys.forEach(key => {
        singleProject[key] = action.payload.projectData[key]
      })
      state.project = currentProject;
    },
    deleteProject(state, action) {
      state.projects = state.projects.filter(project => project.id !== action.payload);
    },
    setProject(state, action) {
      state.project = action.payload;
      state.tasks = action.payload.tasks?.filter(task => task.status === 'ACTIVE');
    },
    updateClientOnProject(state, action) {
      state.project.client = action.payload;
    },
    searchTasksByStatusAndName(state, action) {
      let filteredTasks = state.project.tasks;
      if (action.payload.status !== 'all') {
        filteredTasks = filteredTasks.filter(task => task.status === action.payload.status);
      }
      action.payload.name && (filteredTasks = filteredTasks.filter(task => task.name.toLowerCase().includes(action.payload.name.toLowerCase())))
      state.tasks = filteredTasks
    },
    addNewTask(state, action) {
      state.project.tasks = [action.payload, ...state.project.tasks]
      state.tasks = [action.payload, ...state.tasks]
    },
    editTask(state, action) {
      const projectTasks = [...state.project.tasks];
      const projectTaskIndex = projectTasks.findIndex(task => task.id === action.payload.id);
      projectTasks[projectTaskIndex] = { ...projectTasks[projectTaskIndex], ...action.payload };

      const tasks = [...state.tasks];
      const taskIndex = tasks.findIndex(task => task.id === action.payload.id);
      tasks[taskIndex] = { ...tasks[taskIndex], ...action.payload };

      state.project.tasks = projectTasks;
      state.tasks = tasks;
    },
    deleteTask(state, action) {
      state.project.tasks = state.project.tasks.filter(task => task.id !== action.payload);
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    }
  }
})

export const projectsActions = projectsSlice.actions;

export default projectsSlice;
