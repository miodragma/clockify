import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomFilterDropdown from '../../../../UI/CustomFilterDropdown/CustomFilterDropdown';

import { reviver } from '../../../../Utils/reviver';

import { fetchAllGroups } from '../../../store/teams-actions';
import { teamsActions } from '../../../store/teams-slice';
import { loaderActions } from '../../../../UI/store/loader/loader-slice';

import classes from './GroupDropdown.module.css';

const GroupDropdown = props => {

  const { user } = props;
  const { id: userId } = user;

  const groups = useSelector(state => state.teams.groups);
  const newGroupsQueryParams = useSelector(state => state.teams.newGroupsQueryParams);
  const { activeWorkspace: workspaceId } = useSelector(state => state.user.user);

  const dispatch = useDispatch();

  const groupName = useRef('');

  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);

  useEffect(() => {
    if (!groupName.current) {
      const currentSelectedGroups = groups.filter(group => group.userIds.includes(userId));
      setSelectedIds(currentSelectedGroups.map(group => group.id));
      setSelectedGroups(currentSelectedGroups);
    }
  }, [groups, userId]);

  const onSearchGroupByNameHandler = useCallback(name => {
    groupName.current = name;
    const currentNewGroupQueryParams = JSON.parse(newGroupsQueryParams, reviver);
    currentNewGroupQueryParams.set('name', name);
    dispatch(fetchAllGroups({ queryParams: currentNewGroupQueryParams, workspaceId }));
  }, [dispatch, newGroupsQueryParams, workspaceId]);

  const onClickCheckGroupHandler = useCallback(val => {
    const isIncludeId = [...selectedIds].includes(val);
    if (!isIncludeId) {
      setSelectedIds([...selectedIds, val])
    } else {
      setSelectedIds(selectedIds.filter(id => id !== val))
    }
  }, [selectedIds]);

  const onCloseDropdownHandler = useCallback(() => {
    /*TODO the API is missing update group userIds*/

    /*TODO make a new userGroup array */
    dispatch(teamsActions.updateGroups({ selectedIds, userId }))
    dispatch(loaderActions.showToast({ toastMessage: `Access updated`, type: 'success' }))
    dispatch(loaderActions.showToast({ toastMessage: `The access update is a dummy for now.`, type: 'info' }))
  }, [dispatch, selectedIds, userId]);

  const dropdownLabel = selectedGroups.length ? selectedGroups.map(group => group.name).join(', ') : '';
  const isGroups = dropdownLabel.length;


  return (
    <CustomFilterDropdown
      classNameCustomDropdown={classes.groupsCustomDropdown}
      classCustomDropdownSubWrapper={isGroups ? classes.groupsLabelSubWrapper : classes.addGroupsLabelSubWrapper}
      className={isGroups ? classes.groups : classes.addGroups}
      inputLabel='Find user groups...'
      isIcon={!isGroups}
      dropdownLabel={isGroups ? dropdownLabel : 'Group'}
      groups={groups}
      users={[]}
      isDropdownData={false}
      isUsersAndGroups={true}
      isSelectAllCheckbox={false}
      selectedListIds={selectedIds}
      isSelectAll={false}
      isSearchByName={false}
      isBadgeCounter={false}
      searchByName={onSearchGroupByNameHandler}
      clickCheck={onClickCheckGroupHandler}
      isUseWithoutClient={false}
      currentInputValue={groupName.current}
      isCloseEvent={true}
      onCloseEvent={onCloseDropdownHandler}/>
  )

};

export default GroupDropdown;
