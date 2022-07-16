import ModalWrapper from '../ModalWrapper/ModalWrapper';

import classes from './DeleteItemModal.module.css';

const DeleteItemModal = props => {

  const {
    showDeleteActionModal,
    message,
    onSubmitActionModal,
    onHideActionModal,
    title = 'Delete',
    buttonTitle = 'Delete'
  } = props;

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
      title={title}
      buttonTitle={buttonTitle}
      className={'warning'}
      onClickSubmitButton={submitActionModalHandler}>
      <div>
        <p className={classes.actionModalMessage}>{message}</p>
      </div>
    </ModalWrapper>
  )

};

export default DeleteItemModal;
