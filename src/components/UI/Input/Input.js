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
    autofocus
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
        onChangeInputVal(inputVal)
      }, 300);

      return () => {
        clearTimeout(timer);
      }
    } else {
      onChangeInputVal(inputVal)
    }

  }, [currentValue, inputVal, isDebounce, onChangeInputVal, isNewAdded, inputValIsEmpty])


  const onChangeInputValHandler = e => {
    const val = e.target.value;
    setInputVal(val)
  };

  return (
    <Fragment>
      <Form.Group>
        {label && <Form.Label className={classes.label}>{label}</Form.Label>}
        <Form.Control
          autoFocus={autofocus}
          className={`${classes.input} ${className || ''}`}
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
