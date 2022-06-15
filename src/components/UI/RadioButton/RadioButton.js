import { Form } from 'react-bootstrap';

import classes from './RadioButton.module.css';

const RadioButton = props => {

  const {isChecked, label, changeCheckValue, type, buttonWrapper} = props;

  const onChangeCheckValue = () => {
    changeCheckValue()
  }

  return (
    <div onClick={onChangeCheckValue} className={`${classes.radioWrapper} ${buttonWrapper || ''}`}>
      <Form.Check
        type={type}>
        <Form.Check.Input readOnly checked={isChecked} type={type} className={classes.radio}/>
        <Form.Check.Label className={classes.label}>{label}</Form.Check.Label>
      </Form.Check>
    </div>
  )
};

export default RadioButton;
