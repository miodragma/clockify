import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { updateProject } from '../../../store/projects-actions';

import CustomCheckButton from '../../../../UI/CustomCheckButton/CustomCheckButton';

import classes from './Visibility.module.css';

const Visibility = props => {

  const { className, accessTitle, accessSubTitle, project } = props;
  const { public: isPublic, workspaceId, id: projectId, name } = project;

  const dispatch = useDispatch();

  const onCheckIsPublicHandler = useCallback(currIsPublic => {
    if (currIsPublic !== isPublic) {
      dispatch(updateProject({
        dataToUpdate: { ...project, name, isPublic: currIsPublic },
        workspaceId,
        id: projectId
      }))
    }
  }, [isPublic, dispatch, project, name, workspaceId, projectId]);

  return (
    <div className={`${className ? className : ''}`}>
      <p className={`${accessTitle ? accessTitle : ''}`}>Visibility</p>
      <p className={`${accessSubTitle ? accessSubTitle : ''} ${classes.visibilitySubTitle}`}>Only people you add to the
        project can track time on
        it.</p>
      <div className={classes.isPublicButtonsWrapper}>
        <CustomCheckButton
          buttonWrapper={classes.radioButton}
          isChecked={!isPublic}
          label='Private'
          changeCheckValue={() => onCheckIsPublicHandler(false)}
          type='radio'/>
        <CustomCheckButton
          buttonWrapper={classes.radioButton}
          isChecked={isPublic}
          label='Public'
          changeCheckValue={() => onCheckIsPublicHandler(true)}
          type='radio'/>
      </div>
    </div>
  )

};

export default Visibility;
