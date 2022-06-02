import { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';

import ModalWrapper from '../../UI/ModalWrapper/ModalWrapper';
import Input from '../../UI/Input/Input';

import classes from './TagsEdit.module.css';

const TagsEdit = props => {

  const isMounted = useRef(true);

  const [inputTagName, setInputTagName] = useState('');
  const [isDisabledButton, setIsDisabledButton] = useState(false);

  const {tag, submitEditTag, show, onHide} = props;
  const {name, archived, id} = tag;

  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
      return;
    }

    const isDisabled = inputTagName.trim() === name || !inputTagName;

    setIsDisabledButton(isDisabled);
  }, [name, inputTagName])

  const onChangeTagNameHandler = useCallback(tagName => {
    setInputTagName(tagName)
  }, []);

  const onSubmitFormHandler = () => {
    const editTagData = {
      name: inputTagName,
      archived: archived,
      tagId: id
    };
    submitEditTag(editTagData);
    onHide();
  }

  return (
    <ModalWrapper
      show={show}
      onHide={onHide}
      title='Edit tag'
      isDisabledButton={isDisabledButton}
      className={'primary'}
      autoFocus={true}
      onClickSubmitButton={onSubmitFormHandler}>
      <Form>
        <Input
          className={classes.formField}
          label='Change name'
          type='text'
          onChangeInputVal={onChangeTagNameHandler}
          currentValue={name}
          autofocus={true}/>
      </Form>
    </ModalWrapper>
  );
};

export default TagsEdit;
