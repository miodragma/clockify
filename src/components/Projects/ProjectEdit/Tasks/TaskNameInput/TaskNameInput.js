import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Input from '../../../../UI/Input/Input';

import { editTask } from '../../../store/projects-actions';

import classes from './TaskNameInput.module.css';
import { removeExtraSpace } from '../../../../Utils/removeExtraSpace';

const TaskNameInput = props => {

  const { task, project } = props;

  const dispatch = useDispatch();

  const { name } = task;
  const { id: projectId, workspaceId } = project;

  const onFocusNameHandler = useCallback(val => {

  }, []);

  const onBlurNameHandler = useCallback(val => {
    if (removeExtraSpace(val) !== removeExtraSpace(name)) {
      const taskData = {
        ...task,
        name: removeExtraSpace(val),
      }
      dispatch(editTask({ projectId, workspaceId, taskData, taskId: task.id }))
    }
  }, [dispatch, name, projectId, task, workspaceId]);

  return (
    <Input
      isOnChangeInputVal={false}
      isFocusAndBlur={true}
      className={`${task.status === 'DONE' && classes.doneTaskNameInput} ${classes.taskNameInput}`}
      type='text'
      currentValue={task.name}
      onFocus={onFocusNameHandler}
      onBlur={onBlurNameHandler}
    />
  )

};

export default TaskNameInput;
