import { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, OverlayTrigger, Popover } from 'react-bootstrap';

import DropdownMenu from '../../../../UI/DropdownMenu/DropdownMenu';
import CustomCheckButton from '../../../../UI/CustomCheckButton/CustomCheckButton';
import Input from '../../../../UI/Input/Input';

import { projectEstimateDropdown } from './dropdownData/projectEstimateDropdown';

import { updateProject } from '../../../store/projects-actions';

import classes from './ProjectEstimate.module.css';

const ProjectEstimate = props => {

  const { className, settingsTitle, settingsSubTitle, project } = props;
  const { workspaceId, id: projectId, timeEstimate } = project;
  const { active: activeTimeEstimate, type: typeTimeEstimate, estimate: estimateTime } = timeEstimate;
  const [estimateLabel, setEstimateLabel] = useState('');
  const [isTimeEstimate, setIsTimeEstimate] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const currEstimate = projectEstimateDropdown.find(item => item.value === activeTimeEstimate);
    setEstimateLabel(currEstimate.label);
    setIsTimeEstimate(currEstimate.value);
  }, [activeTimeEstimate])

  const onChangeProjectEstimateHandler = useCallback(active => {
    dispatch(updateProject({
      actionType: 'estimate',
      dataToUpdate: { timeEstimate: { ...timeEstimate, active } },
      workspaceId: workspaceId,
      id: projectId
    }))
  }, [dispatch, projectId, timeEstimate, workspaceId]);

  const onCheckTimeEstimate = useCallback(type => {
    if (type !== typeTimeEstimate) {
      dispatch(updateProject({
        actionType: 'estimate',
        dataToUpdate: {
          timeEstimate: {
            ...timeEstimate,
            type,
            estimate: type === 'AUTO' ? 'P0D' : timeEstimate.estimate
          }
        },
        workspaceId: workspaceId,
        id: projectId
      }))
    }
  }, [dispatch, projectId, timeEstimate, typeTimeEstimate, workspaceId]);

  const onFocusTimeHandler = useCallback(() => {
  }, []);

  const onBlurTimeHandler = useCallback(estimate => {
    dispatch(updateProject({
      actionType: 'estimate',
      dataToUpdate: { timeEstimate: { ...timeEstimate, estimate: `PT${estimate}H` } },
      workspaceId: workspaceId,
      id: projectId
    }))
  }, [dispatch, projectId, timeEstimate, workspaceId])

  return (
    <Fragment>
      <div className={`${className ? className : ''}`}>
        <p className={`${settingsTitle ? settingsTitle : ''}`}>Project estimate</p>
        <p className={`${settingsSubTitle ? settingsSubTitle : ''}`}>Choose how you wish to track project progress (time
          or fixed fee budget).</p>
        <DropdownMenu
          currentDropdownLabel={estimateLabel}
          className={classes.estimateDropdownList}
          dropdownMenuData={projectEstimateDropdown}
          onChangeSelectVal={onChangeProjectEstimateHandler}/>
        {isTimeEstimate && <div className={classes.timeEstimateWrapper}>
          <div className={classes.timeEstimateSubWrapper}>
            <CustomCheckButton
              buttonWrapper={classes.typeTimeEstimate}
              isChecked={typeTimeEstimate === 'MANUAL'} label='Manual'
              changeCheckValue={() => onCheckTimeEstimate('MANUAL')} type='radio'/>
            {typeTimeEstimate === 'AUTO' ? <input
                className={classes.timeEstimateInput}
                readOnly={true}
                value={estimateTime.replace(/\D/g, '')}/> :
              <Input
                className={classes.timeEstimateInput}
                isRestrictInput={true}
                isOnChangeInputVal={false}
                isFocusAndBlur={true}
                type='text'
                currentValue={estimateTime.replace(/\D/g, '')}
                onFocus={onFocusTimeHandler}
                onBlur={onBlurTimeHandler}
              />}
            <p>hours</p>
          </div>
          <CustomCheckButton
            buttonWrapper={classes.typeTimeEstimate}
            isChecked={typeTimeEstimate === 'AUTO'} label='Task based'
            changeCheckValue={() => onCheckTimeEstimate('AUTO')} type='radio'/>
          <OverlayTrigger
            trigger="click"
            key='right'
            placement='right'
            overlay={
              <Popover id='popover-positioned-right'>
                <Popover.Body>
                  <a rel="noreferrer" className={'popoverLink'} target='_blank'
                     href='https://app.clockify.me/upgrade?plan=pro'>Upgrade</a> to PRO to exclude non-billable time.
                </Popover.Body>
              </Popover>
            }>
            <div className={classes.estimatePopoverContent}>
              <Form.Check
                readOnly={true}
                className={classes.switchButton}
                type="switch"
                id="resetsEveryMonth"
                label="Estimate resets every month"
                checked={false}
              />
              <Form.Check
                readOnly={true}
                className={classes.switchButton}
                type="switch"
                id="includesNonBillable"
                label="Estimate includes non-billable time"
                checked={true}
              />
            </div>
          </OverlayTrigger>
        </div>}
      </div>
      <div className={`${className ? className : ''}`}>
        <div className={'primaryInfo'}>
          <span>PRO feature</span><a rel="noreferrer" href='https://app.clockify.me/upgrade?plan=pro' target='_blank'
                                     className={classes.upgradeProLink}>Upgrade</a>
        </div>
        <p className={`${settingsTitle ? settingsTitle : ''}`}> Add additional fields </p>
        <p className={`${settingsSubTitle ? settingsSubTitle : ''} ${classes.paragraphSubTitle}`}>All time entries on
          this project will have these fields. You can choose if users can see them and set their default value.</p>
        <DropdownMenu
          className={`${classes.estimateDropdownList} ${classes.addMoreFieldsDropdown}`}
          dropdownMenuData={[{
            label: 'Add more fields...',
            value: false
          }]}/>
      </div>
    </Fragment>
  )

};

export default ProjectEstimate;
