import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Input from '../../../../UI/Input/Input';

import { editTask } from '../../../store/projects-actions';

import classes from './TaskNameInput.module.css';
import { removeExtraSpace } from '../../../../Utils/removeExtraSpace';

const TaskNameInput = props => {

  const { task, project, workspaceId } = props;

  const dispatch = useDispatch();

  const { id: taskId, name } = task;
  const { id: projectId } = project

  const onFocusNameHandler = useCallback(val => {

  }, []);

  const onBlurNameHandler = useCallback(val => {
    if (removeExtraSpace(val) !== removeExtraSpace(name)) {
      const taskData = {
        name: removeExtraSpace(val)
      }
      dispatch(editTask({ projectId, workspaceId, taskData, taskId }))
    }
  }, [dispatch, name, projectId, taskId, workspaceId]);

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
