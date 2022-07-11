import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import Input from '../../../../UI/Input/Input';
import ModalWrapper from '../../../../UI/ModalWrapper/ModalWrapper';
import CustomCheckButton from '../../../../UI/CustomCheckButton/CustomCheckButton';

import { updateProject } from '../../../store/projects-actions';

import calendar from '../../../../../assets/calendar-icon.svg';

import classes from './ProjectBillableRate.module.css';

const ProjectBillableRate = props => {

  const dispatch = useDispatch();

  const { className, settingsTitle, settingsSubTitle, project } = props;
  const { hourlyRate, workspaceId, id: projectId } = project;
  const { amount: hourlyRateAmount } = hourlyRate;

  const [showModal, setShowModal] = useState(false);
  const [rateVal, setRateVal] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);

  const onClickRateButtonHandler = () => {
    setShowModal(true);
  };

  const onHideModalHandler = useCallback(() => {
    setShowModal(false)
  }, []);

  const onChangeRateValueHandler = useCallback(val => {

    if (hourlyRateAmount / 100 !== +val) {
      setIsDisabled(false)
      setRateVal(val);
    } else {
      setIsDisabled(true)
    }
  }, [hourlyRateAmount]);

  const onSubmitFormHandler = useCallback(() => {
    let val = '';
    if (rateVal.includes('.')) {
      const rateValDecimal = rateVal.substring(rateVal?.indexOf('.') + 1);
      if (rateValDecimal.length === 1) {
        val = `${rateVal.replaceAll('.', '')}0`
      } else {
        val = rateVal.replaceAll('.', '')
      }
    } else {
      val = `${rateVal}00`;
    }
    dispatch(updateProject({
      dataToUpdate: { hourlyRate: { amount: +val } },
      workspaceId: workspaceId,
      id: projectId
    }))
    setShowModal(false)
  }, [dispatch, projectId, rateVal, workspaceId])

  return (
    <div className={`${className ? className : ''}`}>
      <p className={`${settingsTitle ? settingsTitle : ''}`}>Project billable rate</p>
      <p className={`${settingsSubTitle ? settingsSubTitle : ''}`}>Billable rate used for calculating billable amount
        for this project.</p>
      <div className={classes.inputWrapper}>
        <div>
          <label>Hourly rate (USD)</label>
          <input
            readOnly={true}
            value={hourlyRateAmount === 0 ? '—' : hourlyRateAmount / 100}/>
        </div>
        <button onClick={onClickRateButtonHandler}>{hourlyRateAmount === 0 ? 'Set rate' : 'Change'}</button>
      </div>
      <ModalWrapper
        show={showModal}
        onHide={onHideModalHandler}
        title={`${hourlyRateAmount === 0 ? 'Set rate' : 'Edit rate'}`}
        isDisabledButton={isDisabled}
        className={'primary'}
        autoFocus={true}
        onClickSubmitButton={onSubmitFormHandler}>
        <div className={'primaryInfo'}>
          <span>We'll apply this rate to all entries on this project, unless some member has a more specific rate for this project.</span>
        </div>
        <Input
          isRestrictInput={true}
          autofocus={true}
          type='number'
          currentValue={`${hourlyRateAmount !== 0 ? hourlyRateAmount / 100 : ''}`}
          label='What is the new billable rate'
          onChangeInputVal={onChangeRateValueHandler}
        />
        <OverlayTrigger
          trigger="click"
          key='top'
          placement='top'
          overlay={
            <Popover id='popover-positioned-top'>
              <Popover.Body>
                Upgrade to BASIC or apply new rate to old entries <a rel="noreferrer" className={'popoverLink'}
                                                                     target='_blank'
                                                                     href='https://clockify.me/help/reports/rates/hourly-rates#historic-rates'>manually.</a>
              </Popover.Body>
            </Popover>
          }>
          <div className={classes.applyBillableRateWrapper}>
            <p>Apply this billable rate to:</p>
            <div className={classes.applyBillableRateSubWrapper}>
              <CustomCheckButton isReadOnly={true} buttonWrapper={classes.applyBillableRateRadioButton} type='radio'
                                 isChecked={true} label='Time entries from'/>
              <img src={calendar} alt="calendar"/>
              <Input
                className={classes.applyBillableRateSubWrapperInput}
                isOnChangeInputVal={false}
                isReadonly={true}
                type='text'
                currentValue='Now'
              />
              <p>onwards</p>
            </div>
            <CustomCheckButton isReadOnly={true} buttonWrapper={classes.applyBillableRateRadioButton} type='radio'
                               isChecked={false} label='All past and future time entries'/>
          </div>
        </OverlayTrigger>
      </ModalWrapper>
    </div>
  )

};

export default ProjectBillableRate;
