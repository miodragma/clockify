import { useCallback } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import Input from '../Input/Input';
import CustomCheckButton from '../CustomCheckButton/CustomCheckButton';
import ModalWrapper from '../ModalWrapper/ModalWrapper';

import calendar from '../../../assets/calendar-icon.svg';

import classes from './BillableRateModal.module.css';

const BillableRateModal = props => {

  const {
    showModal,
    onHideModal,
    amount,
    isDisabled,
    onSubmitFormBillableRate,
    infoMessage,
    onChangeRateValue
  } = props;

  const onHideModalHandler = useCallback(() => {
    onHideModal()
  }, [onHideModal]);

  const onSubmitFormHandler = useCallback(() => {
    onSubmitFormBillableRate();
  }, [onSubmitFormBillableRate]);

  const onChangeRateValueHandler = useCallback(val => {
    onChangeRateValue(val);
  }, [onChangeRateValue])

  return (
    <ModalWrapper
      show={showModal}
      onHide={onHideModalHandler}
      title={`${amount === 0 ? 'Set rate' : 'Edit rate'}`}
      isDisabledButton={isDisabled}
      className={'primary'}
      autoFocus={true}
      onClickSubmitButton={onSubmitFormHandler}>
      <div className={'primaryInfo'}>
        <span>{infoMessage}</span>
      </div>
      <Input
        isRestrictInput={true}
        autofocus={true}
        type='number'
        currentValue={`${amount !== 0 ? amount / 100 : ''}`}
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
  )

};

export default BillableRateModal;
