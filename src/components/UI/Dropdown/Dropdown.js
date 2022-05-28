import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

import classes from './Dropdown.module.css';

const Dropdown = props => {

  const {optionsData, className, onChangeSelectVal} = props;

  const options = optionsData && optionsData.map((item, index) => {
    return (<option key={index} value={item.value}>{item.label}</option>)
  })

  const onChangeSelectValHandler = e => {
    onChangeSelectVal(e.target.value)
  }

  return (
    <Form.Select className={`${classes.select} ${className || ''}`} onChange={onChangeSelectValHandler}>
      {options}
    </Form.Select>
  )
};

export default Dropdown;

Dropdown.propTypes = {
  optionsData: PropTypes.array,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  label: PropTypes.string
}
