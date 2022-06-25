import ModalWrapper from '../../UI/ModalWrapper/ModalWrapper';

import classes from './DeleteProjectModal.module.css';

const DeleteProjectModal = props => {

  const {showDeleteActionModal, projectName, onSubmitActionModal, onHideActionModal} = props;

  const onHideActionModalHandler = () => {
    onHideActionModal();
  };

  const submitActionModalHandler = () => {
    onSubmitActionModal()
  };

  return (
    <ModalWrapper
      show={showDeleteActionModal}
      onHide={onHideActionModalHandler}
      title='Delete'
      buttonTitle='Delete'
      className={'warning'}
      onClickSubmitButton={submitActionModalHandler}>
      <div>
        <p className={classes.actionModalMessage}>The {projectName} Project will also be removed from all time
          entries it is
          assigned to. This action cannot be reversed.</p>
      </div>
    </ModalWrapper>
  )

};

export default DeleteProjectModal;
