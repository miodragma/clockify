import { Form } from 'react-bootstrap';

import classes from './RadioButton.module.css';

const RadioButton = props => {

  const {isChecked, label, changeBillable} = props;

  const onChangeChecked = () => {
    changeBillable()
  }

  return (
    <div onClick={onChangeChecked} className={classes.radioWrapper}>
      <Form.Check
        type='radio'>
        <Form.Check.Input readOnly checked={isChecked} type='radio' className={classes.radio}/>
        <Form.Check.Label className={classes.label}>{label}</Form.Check.Label>
      </Form.Check>
    </div>
  )
};

export default RadioButton;
