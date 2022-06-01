import { Fragment, useEffect, useRef, useState } from 'react';

import { Form } from 'react-bootstrap';
import classes from './Textarea.module.css';
import PropTypes from 'prop-types';

const Textarea = props => {

  const {label, className, currentValue, placeholder, onChangeTextareaVal} = props;
  const isMounted = useRef(true);

  const [textareaValue, setTextareaValue] = useState('');

  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
      if (currentValue) {
        setTextareaValue(currentValue);
      }
      // return;
    }
    onChangeTextareaVal(textareaValue)
  }, [currentValue, onChangeTextareaVal, textareaValue])

  const onChangeTextareaValHandler = e => {
    const val = e.target.value;
    setTextareaValue(val);
    onChangeTextareaVal(val)
  }

  return (
    <Fragment>
      <Form.Group>
        {label && <Form.Label className={classes.label}>{label}</Form.Label>}
        <Form.Control
          className={`${classes.textarea} ${className || ''}`}
          value={textareaValue}
          onChange={onChangeTextareaValHandler}
          as='textarea'
          placeholder={placeholder}
          rows={5}/>
      </Form.Group>
    </Fragment>
  )
};

export default Textarea;

Textarea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChangeTextareaVal: PropTypes.func
}
