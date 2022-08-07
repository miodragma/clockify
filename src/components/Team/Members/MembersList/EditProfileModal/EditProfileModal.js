import { useCallback } from 'react';
import { Button } from 'react-bootstrap';

import ModalWrapper from '../../../../UI/ModalWrapper/ModalWrapper';

import classes from './EditProfileModal.module.css';

const EditProfileModal = props => {

  /*TODO need to finish Edit profile modal*/

  const { showEditProfileModal, onHideRoleModal, user } = props;

  const onHideEditProfileModalHandler = useCallback(() => {
    onHideRoleModal();
  }, [onHideRoleModal]);

  return (
    <ModalWrapper
      show={showEditProfileModal}
      onHide={onHideEditProfileModalHandler}
      title='Edit profile'
      isDisabledButton={true}
      className={'primary'}
      autoFocus={true}>
      <div className={'primaryInfo'}>
        <span>BASIC features</span><a rel="noreferrer" href='https://app.clockify.me/upgrade?plan=basic' target='_blank'
                                      className='upgradeLink'>Upgrade</a>
      </div>
      <div className={classes.blockWrapper}>
        <div className={classes.editProfileSection}>
          <p className={classes.editProfileSectionTitle}>Profile photo</p>
          <p className={classes.editProfileSectionSubtitle}>Formats: png, jpg, gif. Max size: 1 MB.</p>
          <div className={classes.avatarWrapper}>
            <div className={classes.avatar}>
              <span>MM</span>
            </div>
            <Button
              className={`${classes.uploadImageButton} primary`}
              disabled={true}>Upload image</Button>
          </div>
        </div>
        <div className={classes.editProfileSection}>
          <p className={classes.editProfileSectionTitle}>Personal info</p>
          <p className={classes.editProfileSectionSubtitle}>User log-in credentials and the name that is displayed in
            reports.
          </p>
          <div className='standardInputWrapper'>
            <label className='standardLabel'>Name</label>
            <input className='standardInput' type="text" readOnly={true} value={user?.name}/>
          </div>
          <div className='standardInputWrapper'>
            <label className='standardLabel'>Email</label>
            <div className={classes.editProfileEmailSection}>
              <input className='standardInput' type="email" readOnly={true} value={user?.email}/>
              <button>Change</button>
            </div>
          </div>
        </div>
        <div className={classes.editProfileSection}>
          <p className={classes.editProfileSectionTitle}>Week start</p>
          <p className={classes.editProfileSectionSubtitle}>Change when the user's week starts.</p>
        </div>
      </div>
    </ModalWrapper>
  );

};

export default EditProfileModal;
