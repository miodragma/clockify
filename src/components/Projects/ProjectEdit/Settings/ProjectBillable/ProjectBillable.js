import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Form } from 'react-bootstrap';

import { updateProject } from '../../../store/projects-actions';

import classes from './ProjectBillable.module.css';

const ProjectBillable = props => {

  const dispatch = useDispatch()

  const { className, settingsTitle, settingsSubTitle, project } = props;
  const { billable, workspaceId, id: projectId } = project;

  const [isBillable, setIsBillable] = useState(false);

  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      setIsBillable(billable);
      isMounted.current = false;
    }
  }, [billable])

  const onChangeBillableHandler = useCallback((e) => {
    const checkedValue = e.target.checked;
    setIsBillable(checkedValue);
    dispatch(updateProject({
      dataToUpdate: { billable: checkedValue },
      workspaceId: workspaceId,
      id: projectId
    }))
  }, [dispatch, projectId, workspaceId]);

  return (
    <div className={`${className ? className : ''}`}>
      <p className={`${settingsTitle ? settingsTitle : ''}`}>Billable by default</p>
      <p className={`${settingsSubTitle ? settingsSubTitle : ''}`}>All new entries on this project will be initially set
        as billable.</p>
      <Form.Check
        className={classes.switchButton}
        type="switch"
        id="switchEnabled"
        label="Yes"
        checked={isBillable}
        onChange={onChangeBillableHandler}
      />
    </div>
  )

};

export default ProjectBillable;
