import { createSlice } from '@reduxjs/toolkit';

import { replacer } from '../../Utils/replacer';
import { reviver } from '../../Utils/reviver';

const teamsSlice = createSlice({
  name: 'teams',
  initialState: {
    defaultUsersQueryParams: JSON.stringify(new Map([
      ['email', ''],
      ['sort-column', 'NAME'],
      ['sort-order', 'ASCENDING'],
      ['page', '1'],
      ['page-size', ''],
      ['status', ''],
      ['projectId', ''],
      ['includeRoles', true],
      ['memberships', 'WORKSPACE']
    ]), replacer),
    defaultGroupsQueryParams: JSON.stringify(new Map([
      ['projectId', ''],
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
    },
    updateGroups(state, action) {
      /*TODO this is workaround because of missing update groups in API*/
      const newGroups = [...state.groups].map(group => {
        return {
          ...group,
          userIds: []
        }
      });
      action.payload.selectedIds.forEach(selectedId => {
        const currentGroupIndex = newGroups.findIndex(group => group.id === selectedId);
        const newUserIds = [...newGroups[currentGroupIndex].userIds, action.payload.userId];
        newGroups[currentGroupIndex].userIds = [...new Set(newUserIds)];
      })
      state.groups = newGroups;
    },
    updateBillableRate(state, action) {
      const findUserIndex = state.users.findIndex(user => user.id === action.payload.userIdToUpdate);
      state.users[findUserIndex].memberships = action.payload.usersData.memberships;
    }
  }
});

export const teamsActions = teamsSlice.actions;

export default teamsSlice;
