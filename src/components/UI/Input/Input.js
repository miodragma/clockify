import { Fragment, useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

import classes from './Input.module.css';

const Input = props => {

  const isMounted = useRef(true);
  const [inputVal, setInputVal] = useState('');

  const {
    label,
    type,
    placeholder,
    currentValue,
    onChangeInputVal,
    className,
    isDebounce,
    isNewAdded,
    inputValIsEmpty,
    autofocus,
    onFocus,
    onBlur,
    isFocusAndBlur = false,
    isOnChangeInputVal = true
  } = props;

  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
      if (currentValue) {
        setInputVal(currentValue);
      }
      return;
    }

    if (isNewAdded) {
      setInputVal('');
      inputValIsEmpty()
    }

    if (isDebounce) {
      const timer = setTimeout(() => {
        isOnChangeInputVal && onChangeInputVal(inputVal)
      }, 300);

      return () => {
        clearTimeout(timer);
      }
    } else {
      isOnChangeInputVal && onChangeInputVal(inputVal)
    }

  }, [currentValue, inputVal, isDebounce, onChangeInputVal, isNewAdded, inputValIsEmpty, isOnChangeInputVal])

  const onChangeInputValHandler = e => {
    const val = e.target.value;
    setInputVal(val)
  };

  const onFocusHandler = e => {
    isFocusAndBlur && onFocus(e.target.value);
  };

  const onBlurHandler = e => {
    isFocusAndBlur && onBlur(e.target.value)
  }

  return (
    <Fragment>
      <Form.Group>
        {label && <Form.Label className={classes.label}>{label}</Form.Label>}
        <Form.Control
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          autoFocus={autofocus}
          className={`${classes.input} ${className ? className : ''}`}
          value={inputVal}
          onChange={onChangeInputValHandler}
          type={type}
          placeholder={placeholder}/>
      </Form.Group>
    </Fragment>
  )
}

export default Input;

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChangeInputVal: PropTypes.func
}
