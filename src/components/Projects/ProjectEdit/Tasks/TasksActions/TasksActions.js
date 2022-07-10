import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import ShortActions from '../../../../UI/ShortActions/ShortActions';

import { filterTasksData } from '../../dropdownData/filter-tasks-data';

import { projectsActions } from '../../../store/projects-slice';

const TasksActions = props => {

  const { onAddNewTask } = props;

  const [isNewAdded, setIsNewAdded] = useState(false);
  const [newTaskVal, setNewTaskVal] = useState('');
  const searchNameValue = useRef('');
  const taskStatus = useRef('ACTIVE');

  const dispatch = useDispatch();

  const inputValIsEmptyHandler = useCallback(() => {
    setIsNewAdded(false)
  }, []);

  const onClickAddHandler = useCallback(() => {
    setIsNewAdded(true);
    onAddNewTask(newTaskVal)
  }, [newTaskVal, onAddNewTask]);

  const onAddNewTaskHandler = useCallback(val => {
    setNewTaskVal(val.trim());
  }, []);

  const onShowByHandler = useCallback(status => {
    taskStatus.current = status;
    dispatch(projectsActions.searchTasksByStatusAndName({ status, name: searchNameValue.current }))
  }, [dispatch]);

  const onSearchByNameHandler = useCallback(name => {
    const currName = name.trim();
    searchNameValue.current = currName;
    dispatch(projectsActions.searchTasksByStatusAndName({ status: taskStatus.current, name: currName }))
  }, [dispatch]);

  return (
    <ShortActions
      addNewLabel='Add new task'
      dropdownData={filterTasksData}
      onShowBy={onShowByHandler}
      onSearchByName={onSearchByNameHandler}
      isNewAdded={isNewAdded}
      onAddNew={onAddNewTaskHandler}
      inputValIsEmpty={inputValIsEmptyHandler}
      onClickAdd={onClickAddHandler}
      isNewVal={newTaskVal}
    />
  )
}

export default TasksActions;
