import { Form } from 'react-bootstrap';

import classes from './CustomCheckButton.module.css';

const CustomCheckButton = props => {

  const { isChecked, label, changeCheckValue, type, buttonWrapper, isReadOnly = false } = props;

  const onChangeCheckValue = () => {
    !isReadOnly && changeCheckValue()
  }

  return (
    <div onClick={onChangeCheckValue} className={`${classes.customCheckButtonWrapper} ${buttonWrapper || ''}`}>
      <Form.Check
        type={type}>
        <Form.Check.Input readOnly checked={isChecked} type={type} className={classes.customCheckButton}/>
        <Form.Check.Label className={classes.label}>{label}</Form.Check.Label>
      </Form.Check>
    </div>
  )
};

export default CustomCheckButton;
