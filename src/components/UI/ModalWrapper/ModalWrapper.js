import { Button, Modal } from 'react-bootstrap';

import classes from './ModalWrapper.module.css';

const ModalWrapper = props => {

  const {
    show,
    onHide,
    title,
    isDisabledButton,
    className,
    autoFocus,
    onClickSubmitButton,
    buttonTitle
  } = props;

  const onClickSubmit = () => {
    onClickSubmitButton()
  };

  return (
    <Modal
      autoFocus={autoFocus}
      contentClassName={classes.modalContent}
      show={show}
      onHide={onHide}
      size="lg"
      centered>
      <Modal.Header closeButton>
        <Modal.Title
          className={classes.modalTitle}>{title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        <Button className={classes.cancelButton} variant="link" onClick={onHide}>Cancel</Button>
        <Button disabled={isDisabledButton} className={`${classes.submitButton} ${className}`}
                onClick={onClickSubmit}>{buttonTitle || 'Save'}</Button>
      </Modal.Footer>
    </Modal>
  )
};

export default ModalWrapper;
