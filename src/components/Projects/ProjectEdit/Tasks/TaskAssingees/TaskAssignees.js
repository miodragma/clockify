import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomFilterDropdown from '../../../../UI/CustomFilterDropdown/CustomFilterDropdown';

import { reviver } from '../../../../Utils/reviver';
import { compareArrays } from '../../../../Utils/compareArrays';

import { assigneesData } from '../../dropdownData/assignees-data';

import { fetchAllGroups, fetchAllUsers } from '../../../../Team/store/teams-actions';
import { editTask } from '../../../store/projects-actions';

import classes from './TaskAssignees.module.css';

const TaskAssignees = props => {

  const { users, groups, task, currentTasks, onClickCheckAssignees } = props;
  const { activeWorkspace: workspaceId } = useSelector(state => state.user.user);

  const dispatch = useDispatch();

  const { project, tasks } = useSelector(state => state.projects);
  const { newUsersQueryParams, newGroupsQueryParams } = useSelector(state => state.teams);

  const assigneesName = useRef('');
  const assigneesStatus = useRef('');

  const onClickCheckAssigneesHandler = useCallback((val, task) => {
    const userOrGroup = users.some(user => user.id === val) ? 'assigneeIds' : 'userGroupIds';
    const updateTasks = [...currentTasks];
    const findTaskToUpdateIndex = updateTasks.findIndex(currTask => currTask.id === task.id);
    const taskToUpdate = { ...updateTasks[findTaskToUpdateIndex] };
    let idsToUpdate = [...taskToUpdate[userOrGroup]];
    if (task[userOrGroup].includes(val)) {
      idsToUpdate = idsToUpdate.filter(id => id !== val)
    } else {
      idsToUpdate = [...idsToUpdate, val]
    }
    taskToUpdate[userOrGroup] = idsToUpdate
    updateTasks[findTaskToUpdateIndex] = taskToUpdate;
    onClickCheckAssignees(updateTasks)
  }, [currentTasks, onClickCheckAssignees, users]);

  const onSearchAssigneesByNameHandler = useCallback(name => {
    assigneesName.current = name;
    const currentNewUsersQueryParams = JSON.parse(newUsersQueryParams, reviver);
    currentNewUsersQueryParams.set('name', name);
    dispatch(fetchAllUsers({ queryParams: currentNewUsersQueryParams, workspaceId }))

    const currentNewGroupsQueryParams = JSON.parse(newGroupsQueryParams, reviver);
    currentNewGroupsQueryParams.set('name', name);
    dispatch(fetchAllGroups({ queryParams: currentNewGroupsQueryParams, workspaceId }))
  }, [dispatch, newGroupsQueryParams, newUsersQueryParams, workspaceId]);

  const onChangeAssigneesStatusHandler = useCallback(status => {
    assigneesStatus.current = assigneesData.find(assignee => assignee.value === status).label;
    const currentNewUsersQueryParams = JSON.parse(newUsersQueryParams, reviver);
    currentNewUsersQueryParams.set('status', status)
    dispatch(fetchAllUsers({ queryParams: currentNewUsersQueryParams, workspaceId }))
  }, [dispatch, newUsersQueryParams, workspaceId]);

  const onCloseDropdownHandler = useCallback(currTask => {
    const findTask = tasks.find(task => task.id === currTask.id);
    const isEqualUsers = compareArrays(findTask.assigneeIds, currTask.assigneeIds)
    const isEqualGroups = compareArrays(findTask.userGroupIds, currTask.userGroupIds)
    if (!isEqualUsers || !isEqualGroups) {
      const taskData = {
        name: currTask.name,
        assigneeIds: currTask.assigneeIds,
        userGroupIds: currTask.userGroupIds
      }
      dispatch(editTask({ projectId: project.id, workspaceId, taskData, taskId: currTask.id }))
    }

  }, [dispatch, project.id, tasks, workspaceId])

  const findTask = tasks.find(currTask => currTask.id === task.id);
  let dropdownLabel = '';
  const findNameById = (type, data) => data.forEach(item => {
    if (findTask) {
      if (findTask[type]?.includes(item.id)) {
        if (dropdownLabel.length) {
          dropdownLabel = `${dropdownLabel}, ${item.name}`
        } else {
          dropdownLabel = item.name;
        }
      }
    }
  })
  findNameById('userGroupIds', groups);
  findNameById('assigneeIds', users);

  return (
    <CustomFilterDropdown
      classCustomDropdownSubWrapper={classes.assigneesLabelSubWrapper}
      className={classes.assignees}
      inputLabel='Find team...'
      dropdownLabel={dropdownLabel.length ? dropdownLabel : 'Anyone'}
      users={users}
      groups={groups}
      isUsersAndGroups={true}
      isSelectAllCheckbox={false}
      selectedListIds={[...task.assigneeIds, ...task.userGroupIds]}
      isSelectAll={false}
      isSearchByName={false}
      isBadgeCounter={false}
      searchByName={onSearchAssigneesByNameHandler}
      changeActive={onChangeAssigneesStatusHandler}
      clickCheck={val => onClickCheckAssigneesHandler(val, task)}
      currentDropdownData={assigneesData}
      isUseWithoutClient={false}
      currentDropdownLabelVal={assigneesStatus.current || 'Active'}
      currentInputValue={assigneesName.current}
      isCloseEvent={true}
      onCloseEvent={() => onCloseDropdownHandler(task)}/>
  )
};

export default TaskAssignees
