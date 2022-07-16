import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomFilterDropdown from '../../../../UI/CustomFilterDropdown/CustomFilterDropdown';

import { addMembersData } from './addMembersData/add-members-data';

import { reviver } from '../../../../Utils/reviver';
import { fetchAllGroups, fetchAllUsers } from '../../../../Team/store/teams-actions';

import classes from './AddMember.module.css';
import { updateProject } from '../../../store/projects-actions';
import { compareArrays } from '../../../../Utils/compareArrays';

const AddMember = props => {

  const { users, groups, project } = props;
  const { id: projectId, workspaceId, memberships } = project;
  const [selectedIds, setSelectedIds] = useState([]);

  const { newUsersQueryParams, newGroupsQueryParams } = useSelector(state => state.teams);

  const dispatch = useDispatch()

  const teamName = useRef('');
  const teamStatus = useRef('');
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      if (memberships.length) {
        const membershipsIds = memberships.map(membership => membership.userId);
        setSelectedIds(membershipsIds);
      }
      isMounted.current = false;
    }
  }, [memberships])

  const onSearchTeamByNameHandler = useCallback((type, value) => {
    if (type === 'name') {
      teamName.current = value;
    }
    if (type === 'status') {
      teamStatus.current = addMembersData.find(assignee => assignee.value === value).label;
    }

    const currentNewUsersQueryParams = JSON.parse(newUsersQueryParams, reviver);
    const currentNewGroupsQueryParams = JSON.parse(newGroupsQueryParams, reviver);

    currentNewUsersQueryParams.set(type, value);
    currentNewGroupsQueryParams.set(type, value);

    dispatch(fetchAllUsers({ queryParams: currentNewUsersQueryParams, workspaceId }))
    dispatch(fetchAllGroups({ queryParams: currentNewGroupsQueryParams, workspaceId }))
  }, [dispatch, newGroupsQueryParams, newUsersQueryParams, workspaceId]);

  const onClickCheckTeamHandler = useCallback(val => {
    const isIdExist = selectedIds.includes(val);
    if (isIdExist) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== val))
    } else {
      setSelectedIds(prevState => [...prevState, val])
    }
  }, [selectedIds]);

  const onCloseDropdownHandler = useCallback(() => {
    const currMembershipsIds = memberships.map(membership => membership.userId);
    const isEqualMembershipsIds = compareArrays(currMembershipsIds, selectedIds);

    if (!isEqualMembershipsIds && selectedIds.length > 0) {
      const membershipsIds = [...currMembershipsIds, ...selectedIds].map(id => ({ userId: id }));
      dispatch(updateProject({
        actionType: 'memberships',
        dataToUpdate: { memberships: membershipsIds },
        workspaceId,
        id: projectId
      })).then(res => setSelectedIds([]));
    }
  }, [dispatch, memberships, projectId, selectedIds, workspaceId]);

  return (
    <CustomFilterDropdown
      classCustomDropdownSubWrapper={classes.membersLabelSubWrapper}
      className={classes.members}
      isIcon={true}
      inputLabel='Find team...'
      dropdownLabel='Add members'
      users={users}
      groups={groups}
      isUsersAndGroups={true}
      isSelectAllCheckbox={false}
      selectedListIds={selectedIds}
      isSelectAll={false}
      isSearchByName={false}
      isBadgeCounter={false}
      searchByName={name => onSearchTeamByNameHandler('name', name)}
      changeActive={status => onSearchTeamByNameHandler('status', status)}
      clickCheck={onClickCheckTeamHandler}
      currentDropdownData={addMembersData}
      isUseWithoutClient={false}
      currentDropdownLabelVal={teamStatus.current || 'Active'}
      currentInputValue={teamName.current}
      isCloseEvent={true}
      onCloseEvent={onCloseDropdownHandler}/>
  )

};

export default AddMember;
