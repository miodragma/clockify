import ModalWrapper from '../ModalWrapper/ModalWrapper';

import classes from './DeleteItemModal.module.css';

const DeleteItemModal = props => {

  const { showDeleteActionModal, message, onSubmitActionModal, onHideActionModal } = props;

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
        <p className={classes.actionModalMessage}>{message}</p>
      </div>
    </ModalWrapper>
  )

};

export default DeleteItemModal;
