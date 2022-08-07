import { useCallback } from 'react';

import ModalWrapper from '../../../../UI/ModalWrapper/ModalWrapper';
import CustomCheckButton from '../../../../UI/CustomCheckButton/CustomCheckButton';

import classes from './RoleModal.module.css';

const RoleModal = props => {

  const { showRoleModal, onHideRoleModal, userInfoFullName } = props;

  const onHideRoleModalHandler = useCallback(() => {
    onHideRoleModal()
  }, [onHideRoleModal]);

  return (
    <ModalWrapper
      show={showRoleModal}
      onHide={onHideRoleModalHandler}
      title={`${userInfoFullName}'s role`}
      isDisabledButton={true}
      className={'primary'}
      autoFocus={true}>
      <div className={`${classes.roleModalCheckboxWrapper} ${classes.roleModalCheckboxWrapperPadding}`}>
        <CustomCheckButton
          buttonWrapper={classes.checkboxButtonWrapper}
          type='checkbox'
          isReadOnly={true}
          isChecked={true}
          label='Owner'/>
        <p className={classes.checkboxInfo}>Can't be removed or deactivated until ownership is transferred.</p>
      </div>
      <div className={`${classes.infoWrapper} primaryInfo`}>
        <span>STANDARD feature</span><a rel="noreferrer" href='https://app.clockify.me/upgrade' target='_blank'
                                        className='upgradeLink'>Upgrade</a>
      </div>
      <div
        className={`${classes.roleModalCheckboxWrapper} ${classes.roleModalCheckboxWrapperPadding} ${classes.roleModalCheckboxWrapperProjectManager}`}>
        <CustomCheckButton
          buttonWrapper={classes.checkboxButtonWrapper}
          type='checkbox'
          isReadOnly={true}
          isChecked={false}
          label='Project Manager'/>
        <p className={classes.checkboxInfo}>Can edit all projects they manage and see all time on those projects.</p>
      </div>
      <div className={`${classes.roleModalCheckboxWrapper}`}>
        <CustomCheckButton
          buttonWrapper={classes.checkboxButtonWrapper}
          type='checkbox'
          isReadOnly={true}
          isChecked={false}
          label='Team Manager'/>
        <p className={classes.checkboxInfo}>Can see all time of users they manage and approve their timesheets.</p>
      </div>
    </ModalWrapper>
  )

};

export default RoleModal;
