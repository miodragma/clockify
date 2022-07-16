import classes from './ReadonlyInputWithSetButton.module.css';

const ReadonlyInputWithSetButton = props => {

  const { amount, label, onClickSetChange, className } = props;

  const onClickButtonHandler = () => {
    onClickSetChange();
  }

  return (
    <div className={`${classes.inputWrapper} ${className ? className : '`'}`}>
      <div>
        {label && <label>{label}</label>}
        <input
          readOnly={true}
          value={amount === 0 ? '—' : amount / 100}/>
      </div>
      <button onClick={onClickButtonHandler}>{amount === 0 ? 'Set rate' : 'Change'}</button>
    </div>
  );

};

export default ReadonlyInputWithSetButton;
