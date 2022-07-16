import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import Input from '../../../../UI/Input/Input';

import { removeExtraSpace } from '../../../../Utils/removeExtraSpace';
import { updateProject } from '../../../store/projects-actions';

import classes from './ProjectName.module.css';

const ProjectName = props => {

  const { project, className } = props;
  const { id: projectId, name: projectName, workspaceId } = project;

  const dispatch = useDispatch();

  const [currentName, setCurrentName] = useState('');

  const onChangeInputValHandler = useCallback(val => {
    setCurrentName(val)
  }, []);

  const onFocusHandler = useCallback(() => {
  }, []);

  const onBlurHandler = useCallback(() => {
    if (removeExtraSpace(currentName) !== removeExtraSpace(projectName)) {
      dispatch(updateProject({
        dataToUpdate: { ...project, isPublic: project.public, name: removeExtraSpace(currentName) },
        workspaceId: workspaceId,
        id: projectId
      }))
    }
  }, [currentName, dispatch, project, projectId, projectName, workspaceId]);

  return (
    <div className={`${className ? className : ''}`}>
      <Input
        className={classes.inputName}
        classNameLabel={classes.inputNameLabel}
        isFocusAndBlur={true}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        label='Name'
        currentValue={projectName}
        onChangeInputVal={onChangeInputValHandler}/>
    </div>
  )
};

export default ProjectName;
