import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import CustomCheckButton from '../../../UI/CustomCheckButton/CustomCheckButton';
import CustomDropdownWrapper from '../../../UI/CustomDropdownWrapper/CustomDropdownWrapper';

const Billing = props => {

  const {className, onBillingChange} = props;

  const [isBillable, setIsBillable] = useState(false);
  const [isNonBillable, setIsNonBillable] = useState(false);

  const {search} = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);

  useEffect(() => {
    let billingVal = !isBillable && !isNonBillable ? '' : isNonBillable ? 'false' : 'true';
    const data = {
      billable: billingVal
    }
    onBillingChange(data)
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

  const onChangeBillableHandler = useCallback(() => {
    if (!isBillable) {
      setIsNonBillable(false)
    }
    setIsBillable(!isBillable);
  }, [isBillable])

  const onChangeNonBillableHandler = useCallback(() => {
    if (!isNonBillable) {
      setIsBillable(false)
    }
    setIsNonBillable(!isNonBillable);
  }, [isNonBillable])

  let badge = !(!isBillable && !isNonBillable) ? 1 : '';

  return (
    <CustomDropdownWrapper className={className} label='Billing' badgeCounter={badge}>
      <CustomCheckButton type='checkbox' isChecked={isBillable} label='Billable'
                         changeCheckValue={onChangeBillableHandler}/>
      <CustomCheckButton type='checkbox' isChecked={isNonBillable} label='Non billable'
                         changeCheckValue={onChangeNonBillableHandler}/>
    </CustomDropdownWrapper>
  )

};

export default Billing;
