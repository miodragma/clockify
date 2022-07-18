import { useCallback, useState } from 'react';

import ListHeaderRow from '../../../../UI/ListHeaderRow/ListHeaderRow';
import CustomTableHeadingItem from '../../../../UI/CustomTableHeadingItem/CustomTableHeadingItem';
import TableRow from '../../../../UI/TableRow/TableRow';
import TableData from '../../../../UI/TableData/TableData';

import { filterByAscAndDesc } from '../../../../Utils/filterByAscAndDesc';
import { calculateTracked } from '../../../../Utils/calculateTracked';

import { projectStatusTaskList } from './taskListData/task-list-data';

import classes from './TaskList.module.css';

const TaskList = props => {

  const { project, users, groups } = props;
  const { tasks } = project;

  const [sortColumn, setSortColumn] = useState('NAME');
  const [sortOrder, setSortOrder] = useState('ASCENDING');
  const [sortProperty, setSortProperty] = useState('name');

  const onClickSortHandler = useCallback(data => {
    const order = data.sortOrder === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING';
    setSortOrder(order);
    setSortColumn(data.item.value);
    setSortProperty(data.item.property);
  }, [])

  let tasksContent;

  const allUsers = [...groups, ...users]

  if (tasks) {
    tasksContent = filterByAscAndDesc([...tasks], sortOrder, sortProperty).map(task => {

      const membersOfTask = [...task.userGroupIds, ...task.assigneeIds].map(userId => allUsers.find(user => user.id === userId)?.name);

      const trackedTime = calculateTracked(task.duration || '', task.estimate || '');

      return <TableRow key={task.id}>
        <TableData className={`${classes.tableDataName} ${classes.taskListTableData}`}>
          <p className={`${task.status === 'DONE' && classes.doneTaskName}`}>{task.name}</p>
        </TableData>
        <TableData className={classes.taskListTableData}>
          <span>{membersOfTask.length > 0 ? membersOfTask.join(', ') : 'Anyone'}</span>
        </TableData>
        <TableData className={classes.taskListTableData}>
          <p>0 USD</p>
        </TableData>
        <TableData className={classes.taskListTableData}>
          <p className={classes.taskListTableDataTrackedValue}>{trackedTime.getDuration}h</p>
        </TableData>
      </TableRow>
    })
  }

  return (
    <div>
      <ListHeaderRow>
        <p>Tasks</p>
      </ListHeaderRow>
      <table className='customTable'>
        <thead className='customThead'>
        <tr>
          <CustomTableHeadingItem
            data={projectStatusTaskList}
            sortColumn={sortColumn}
            sortOrder={sortOrder}
            clickSortItem={onClickSortHandler}/>
        </tr>
        </thead>
        <tbody>
        {tasksContent}
        </tbody>
      </table>
    </div>
  )

};

export default TaskList
