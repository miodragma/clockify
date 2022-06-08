import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import CustomDropdown from '../../../UI/CustomDropdown/CustomDropdown';
import RadioButton from '../../../UI/RadioButton/RadioButton';

import classes from './Billing.module.css';

const Billing = props => {

  const {className, onBillingChange} = props;

  const [isOpenBilling, setIsOpenBilling] = useState(false);
  const [isBillable, setIsBillable] = useState(false);
  const [isNonBillable, setIsNonBillable] = useState(false);

  const {search} = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);

  useEffect(() => {
    let billingVal = !isBillable && !isNonBillable ? '' : isNonBillable ? 'false' : 'true';
    onBillingChange(billingVal)
  }, [isBillable, isNonBillable, onBillingChange])

  useEffect(() => {
    for (let [key, value] of [...queryParams]) {
      if (key === 'billable') {
        value === 'false' && setIsNonBillable(true);
        value === 'true' && setIsBillable(true);
        if (value === '') {
          setIsNonBillable(false);
          setIsBillable(false);
        }
      }
    }
  }, [queryParams])

  const onOpenItemBilling = () => {
    setIsOpenBilling(true)
  }

  const onCloseBilling = useCallback(() => {
    setIsOpenBilling(false)
  }, [])

  const onChangeBillableHandler = () => {
    if (!isBillable) {
      setIsNonBillable(false)
    }
    setIsBillable(!isBillable);
  }

  const onChangeNonBillableHandler = () => {
    if (!isNonBillable) {
      setIsBillable(false)
    }
    setIsNonBillable(!isNonBillable);
  }

  return (
    <div className={`${className} ${classes.billing}`} onClick={onOpenItemBilling}>
      {!(!isBillable && !isNonBillable) && <span className={classes.badge}>1</span>}
      <div className={classes.billingWrapper}>
        <p className={classes.billingLabel}>Billing</p>
        <div className={classes.dropdownCaretWrapper}>
          <i className={classes.dropdownCaret}/>
          <CustomDropdown isOpenDropdown={isOpenBilling} closeDropdown={onCloseBilling}>
            <RadioButton isChecked={isBillable} label='Billable' changeBillable={onChangeBillableHandler}/>
            <RadioButton isChecked={isNonBillable} label='Non billable' changeBillable={onChangeNonBillableHandler}/>
          </CustomDropdown>
        </div>
      </div>
    </div>
  )

};

export default Billing;
