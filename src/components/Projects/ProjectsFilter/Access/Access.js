import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import CustomFilterDropdown from '../../../Services/CustomFilterDropdown/CustomFilterDropdown';

import { reviver } from '../../../Utils/reviver';
import { existAllValuesInArray } from '../../../Utils/existAllValuesInArray';

import { fetchAllGroups, fetchAllUsers } from '../../../Team/store/teams-actions';

import { dropdownUsersGroupsData } from './dropdownData/dropdownUsersGroupsData';

const Access = props => {

  const {className, onUserGroupFiler} = props;

  const dispatch = useDispatch();

  const {activeWorkspace: workspaceId} = useSelector(state => state.user.user);
  const {users, groups, newUsersQueryParams, newGroupsQueryParams} = useSelector(state => state.teams);

  const nameVal = useRef('');
  const currentDropdownLabelVal = useRef('');

  const [isSelectAll, setIsSelectAll] = useState(false);
  const [usersListIds, setUsersListIds] = useState([]);

  const isChangeArchive = useRef(false);

  const {search} = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);

  useEffect(() => {

    let users = [];
    let containsUser = true;
    const userStatus = currentDropdownLabelVal.current.toUpperCase() || 'ACTIVE';
    if (isSelectAll) {
      users = [];
      containsUser = false;
    }
    if (!!nameVal.current && isSelectAll) {
      users = [...usersListIds];
      containsUser = true;
    }
    if (!isSelectAll && usersListIds.length) {
      users = [...usersListIds];
    }

    const data = {
      'contains-user': containsUser,
      users: Array.from(new Set(users)),
      'user-status': userStatus
    }
    onUserGroupFiler(data)
  }, [isSelectAll, onUserGroupFiler, usersListIds])

  useEffect(() => {
    if (!isChangeArchive.current) {
      const usersQuery = queryParams.get('users').split(',').filter(item => item !== '');
      const userStatus = queryParams.get('user-status');
      const containsUser = queryParams.get('contains-user');

      if (usersQuery.length) {
        setUsersListIds(usersQuery)
      }
      if (!usersQuery.length && containsUser === 'false') {
        const currentUsersIds = [...groups, ...users].map(client => client.id);
        setUsersListIds(currentUsersIds);
        setIsSelectAll(true)
      }
      if (!usersQuery.length && containsUser === 'true') {
        setUsersListIds([]);
        setIsSelectAll(false);
      }
      currentDropdownLabelVal.current = dropdownUsersGroupsData.find(item => item.label.toUpperCase() === userStatus).label
    }
    isChangeArchive.current = false;
  }, [groups, queryParams, users])

  const onSearchUserGroupByNameHandler = useCallback(name => {
    isChangeArchive.current = true;
    const status = dropdownUsersGroupsData.find(data => data.label === currentDropdownLabelVal.current)?.value
    nameVal.current = name;
    const usersQueryParams = new Map(JSON.parse(newUsersQueryParams, reviver));
    const groupsQueryParams = new Map(JSON.parse(newGroupsQueryParams, reviver));
    usersQueryParams.set('status', status);
    usersQueryParams.set('email', name);
    groupsQueryParams.set('name', name);
    dispatch(fetchAllUsers({workspaceId, queryParams: usersQueryParams}));
    dispatch(fetchAllGroups({workspaceId, queryParams: groupsQueryParams}))
  }, [dispatch, newGroupsQueryParams, newUsersQueryParams, workspaceId]);

  const onChangeActive = useCallback(active => {
    isChangeArchive.current = true;
    const activeData = dropdownUsersGroupsData.find(data => data.value === active)
    currentDropdownLabelVal.current = activeData.label;
    setUsersListIds([]);
    setIsSelectAll(false);
    const usersQueryParams = new Map(JSON.parse(newUsersQueryParams, reviver));
    usersQueryParams.set('email', nameVal.current);
    usersQueryParams.set('status', activeData.value);
    dispatch(fetchAllUsers({workspaceId, queryParams: usersQueryParams}));
  }, [dispatch, newUsersQueryParams, workspaceId]);

  const onChangeSelectAllHandler = useCallback(() => {
    const currentIsSelectAll = isSelectAll;
    if (!currentIsSelectAll) {
      const allUsersIds = [...groups, ...users].map(client => client.id);
      setUsersListIds(allUsersIds)
    } else {
      setUsersListIds([])
    }
    setIsSelectAll(!currentIsSelectAll)
  }, [groups, isSelectAll, users]);

  const onClickCheckUserGroup = useCallback(userId => {
    const filterUsersIds = [...groups, ...users].map(client => client.id);
    let newUsersListIds = [];

    const isUser = usersListIds.some(id => id === userId);
    if (isUser) {
      newUsersListIds = usersListIds.filter(id => id !== userId);
    } else {
      newUsersListIds = [...usersListIds, userId]
    }
    const isSelectAll = existAllValuesInArray(filterUsersIds, newUsersListIds);
    if (isSelectAll) {
      setIsSelectAll(true);
    } else {
      setIsSelectAll(false);
    }
    setUsersListIds(newUsersListIds);
  }, [groups, users, usersListIds]);

  return (
    <CustomFilterDropdown
      className={className}
      inputLabel='SearchClient'
      dropdownLabel='Access'
      users={users}
      groups={groups}
      isFromAccess={true}
      selectedListIds={usersListIds}
      isSelectAll={isSelectAll}
      isSearchByName={!!nameVal.current}
      searchByName={onSearchUserGroupByNameHandler}
      changeActive={onChangeActive}
      changeSelectAll={onChangeSelectAllHandler}
      clickCheck={onClickCheckUserGroup}
      currentDropdownData={dropdownUsersGroupsData}
      isUseWithoutClient={false}
      currentDropdownLabelVal={currentDropdownLabelVal.current || 'Active'}
      currentInputValue={nameVal.current}
    />
  );
};

export default Access;
