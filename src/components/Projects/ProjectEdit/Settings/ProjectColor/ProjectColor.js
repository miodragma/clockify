import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { updateProject } from '../../../store/projects-actions';

import ColorPicker from '../../../../UI/ColorPicker/ColorPicker';

const ProjectColor = props => {

  const dispatch = useDispatch();

  const { className, settingsTitle, settingsSubTitle, project } = props;
  const { color: projectColor, workspaceId, id: projectId } = project

  const onChangeColorHandler = useCallback(color => {
    if (color !== projectColor) {
      dispatch(updateProject({
        dataToUpdate: { color },
        workspaceId: workspaceId,
        id: projectId
      }))
    }
  }, [dispatch, projectColor, projectId, workspaceId])

  return (
    <div className={`${className ? className : ''}`}>
      <p className={`${settingsTitle ? settingsTitle : ''}`}>Color</p>
      <p className={`${settingsSubTitle ? settingsSubTitle : ''}`}>Use color to visually differentiate projects.</p>
      <ColorPicker currentColor={project.color} changeColor={onChangeColorHandler}/>
    </div>
  )

}

export default ProjectColor;
