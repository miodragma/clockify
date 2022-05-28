import { Fragment, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

import classes from './Input.module.css';

let isInitial = true;

const Input = props => {

  const [inputVal, setInputVal] = useState('');

  const {label, type, placeholder, currentValue, onChangeInputVal, className, isDebounce} = props;

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      if (currentValue) {
        setInputVal(currentValue);
      }
      return;
    }

    if (isDebounce) {
      const timer = setTimeout(() => {
        onChangeInputVal(inputVal)
      }, 300);

      return () => {
        console.log('CLEAR')
        clearTimeout(timer);
      }
    } else {
      onChangeInputVal(inputVal)
    }

  }, [currentValue, inputVal, isDebounce, onChangeInputVal])

  const onChangeInputValHandler = e => {
    const val = e.target.value;
    setInputVal(val)
  };

  return (
    <Fragment>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control className={`${classes.input} ${className || ''}`} value={inputVal}
                    onChange={onChangeInputValHandler} type={type} placeholder={placeholder}/>
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
