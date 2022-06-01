import { useCallback, useEffect, useRef, useState } from 'react';

import { Form } from 'react-bootstrap';

import Input from '../UI/Input/Input';
import Textarea from '../UI/Textarea/Textarea';
import ModalWrapper from '../UI/ModalWrapper/ModalWrapper';

import classes from './ClientEdit.module.css';

const ClientEdit = props => {

  const isMounted = useRef(true);

  const [inputClientName, setInputClientName] = useState('');
  const [inputClientAddress, setInputClientAddress] = useState('');
  const [inputClientNote, setInputClientNote] = useState('');
  const [isDisabledButton, setIsDisabledButton] = useState(false);

  const {client, submitEditClient, show, onHide} = props;
  const {name, address, note, id} = client;

  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
      return;
    }

    const isDisabledName = inputClientName.trim() === name;
    const isDisabledAddress = inputClientAddress.trim() === address;
    const isDisabledNote = inputClientNote.trim() === note;

    const isDisabled = (isDisabledName && isDisabledAddress && isDisabledNote) || !inputClientName;

    setIsDisabledButton(isDisabled);
  }, [name, inputClientName, inputClientAddress, address, inputClientNote, note])

  const onChangeClientNameHandler = useCallback(clientName => {
    setInputClientName(clientName)
  }, []);

  const onChangeClientAddressHandler = useCallback(clientAddress => {
    setInputClientAddress(clientAddress);
  }, []);

  const onChangeClientNoteHandler = useCallback(clientNote => {
    setInputClientNote(clientNote);
  }, []);

  const onSubmitFormHandler = () => {
    const editClientData = {
      address: inputClientAddress,
      name: inputClientName,
      note: inputClientNote,
      archived: false,
      clientId: id
    };
    submitEditClient(editClientData);
    onHide();
  }

  return (
    <ModalWrapper
      show={show}
      onHide={onHide}
      title='Edit client'
      isDisabledButton={isDisabledButton}
      className={'primary'}
      autoFocus={true}
      onClickSubmitButton={onSubmitFormHandler}>
      <Form>
        <Input
          className={classes.formField}
          label='Client Name'
          type='text'
          onChangeInputVal={onChangeClientNameHandler}
          currentValue={name}
          autofocus={true}/>
        <Textarea
          className={classes.formField}
          label='Client Address'
          placeholder='Enter address'
          onChangeTextareaVal={onChangeClientAddressHandler}
          currentValue={address}/>
        <Textarea
          className={classes.formField}
          label='Client Note'
          placeholder='Enter note'
          onChangeTextareaVal={onChangeClientNoteHandler}
          currentValue={note}/>
      </Form>
    </ModalWrapper>
  );
}

export default ClientEdit;
