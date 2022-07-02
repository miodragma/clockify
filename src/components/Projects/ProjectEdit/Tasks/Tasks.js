import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ListHeaderRow from '../../../UI/ListHeaderRow/ListHeaderRow';
import CustomTableHeadingItem from '../../../UI/CustomTableHeadingItem/CustomTableHeadingItem';
import TableRow from '../../../UI/TableRow/TableRow';
import TableData from '../../../UI/TableData/TableData';
import TasksActions from './TasksActions/TasksActions';
import TaskNameInput from './TaskNameInput/TaskNameInput';
import TaskAssignees from './TaskAssingees/TaskAssignees';

import { reviver } from '../../../Utils/reviver';
import { filterByAscAndDesc } from '../../../Utils/filterByAscAndDesc';

import { fetchAllGroups, fetchAllUsers } from '../../../Team/store/teams-actions';

import { sortTaskData } from '../dropdownData/filter-tasks-data';

import { addNewTask } from '../../store/projects-actions';

import classes from './Tasks.module.css';

const Tasks = () => {

  const dispatch = useDispatch();

  const [sortOrder, setSortOrder] = useState('DESCENDING');
  const [currentTasks, setCurrentTasks] = useState([]);

  const { project, tasks } = useSelector(state => state.projects);

  const { activeWorkspace: workspaceId } = useSelector(state => state.user.user);

  const { users, groups } = useSelector(state => state.teams);
  const { defaultUsersQueryParams, defaultGroupsQueryParams } = useSelector(state => state.teams);

  const isMounted = useRef(true);

  useEffect(() => {

    if (project && isMounted.current) {
      const currentDefaultUsersQueryParams = JSON.parse(defaultUsersQueryParams, reviver);
      currentDefaultUsersQueryParams.set('projectId', project.id);
      currentDefaultUsersQueryParams.set('status', 'ACTIVE')
      dispatch(fetchAllUsers({ queryParams: currentDefaultUsersQueryParams, workspaceId }))

      const currentDefaultGroupsQueryParams = JSON.parse(defaultGroupsQueryParams, reviver);
      currentDefaultGroupsQueryParams.set('projectId', project.id);
      dispatch(fetchAllGroups({ queryParams: currentDefaultGroupsQueryParams, workspaceId }))
      isMounted.current = false
    }
  }, [defaultGroupsQueryParams, defaultUsersQueryParams, dispatch, project, workspaceId]);

  useEffect(() => {
    if (project) {
      setCurrentTasks([...tasks])
    }
  }, [project, tasks])

  const onClickSortItemHandler = data => {
    const order = data.sortOrder === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING';
    setSortOrder(order);
  }

  const addNewTaskHandler = useCallback(val => {
    dispatch(addNewTask({ projectId: project.id, workspaceId, taskName: val }))
  }, [dispatch, project.id, workspaceId]);

  const onClickCheckAssignees = useCallback(updateTasks => {
    setCurrentTasks(updateTasks)
  }, []);

  let tasksContent;

  if (currentTasks) {
    tasksContent = filterByAscAndDesc([...currentTasks], sortOrder).map(task => {

      return <TableRow key={task.id}>
        <TableData className={classes.tableData}>
          <div className={`${classes.tableDataChildrenWrapper} ${classes.inputWrapper}`}>
            <TaskNameInput
              task={task}
              project={project}
              workspaceId={workspaceId}
            />
          </div>
        </TableData>
        <TableData>
          <div className={classes.tableDataChildrenWrapper}>
            <TaskAssignees
              users={users}
              groups={groups}
              task={task}
              currentTasks={currentTasks}
              onClickCheckAssignees={onClickCheckAssignees}
            />
          </div>
        </TableData>
        <TableData>
          <div className={classes.tableDataChildrenWrapper}><p></p></div>
        </TableData>
      </TableRow>
    })
  }

  return (
    <div>
      <TasksActions onAddNewTask={addNewTaskHandler}/>
      <div className={classes.tasksListWrapper}>
        <ListHeaderRow>
          <p>Tasks</p>
        </ListHeaderRow>
        <table className={classes.table}>
          <thead className={classes.thead}>
          <tr>
            <CustomTableHeadingItem
              data={sortTaskData}
              clickSortItem={onClickSortItemHandler}
              sortColumn='NAME'
              sortOrder={sortOrder}/>
          </tr>
          </thead>
          <tbody>
          {tasksContent}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default Tasks;
