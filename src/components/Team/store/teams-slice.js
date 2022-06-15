import { createSlice } from '@reduxjs/toolkit';

import { replacer } from '../../Utils/replacer';
import { reviver } from '../../Utils/reviver';

const teamsSlice = createSlice({
  name: 'teams',
  initialState: {
    defaultUsersQueryParams: JSON.stringify(new Map([
      ['email', ''],
      ['sort-column', 'name'],
      ['sort-order', ''],
      ['page', '1'],
      ['page-size', ''],
      ['status', 'ACTIVE']
    ]), replacer),
    defaultGroupsQueryParams: JSON.stringify(new Map([
      ['name', ''],
      ['sort-column', ''],
      ['sort-order', ''],
      ['page', '1'],
      ['page-size', '']
    ]), replacer),
    newUsersQueryParams: JSON.stringify(new Map(), replacer),
    newGroupsQueryParams: JSON.stringify(new Map(), replacer),
    users: [],
    groups: []
  },
  reducers: {
    changeNewUsersQueryParams(state, action) {
      const queryParams = new Map(JSON.parse(state.defaultUsersQueryParams, reviver));
      JSON.parse(action.payload, reviver).forEach((value, key) => queryParams.set(key, value));
      state.newUsersQueryParams = JSON.stringify(queryParams, replacer);
    },
    changeNewGroupsQueryParams(state, action) {
      const queryParams = new Map(JSON.parse(state.defaultGroupsQueryParams, reviver));
      JSON.parse(action.payload, reviver).forEach((value, key) => queryParams.set(key, value));
      state.newGroupsQueryParams = JSON.stringify(queryParams, replacer);
    },
    setUsers(state, action) {
      state.users = action.payload
    },
    setGroups(state, action) {
      state.groups = action.payload;
    }
  }
});

export const teamsActions = teamsSlice.actions;

export default teamsSlice;
