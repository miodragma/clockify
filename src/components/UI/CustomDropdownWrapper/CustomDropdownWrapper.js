import { useCallback, useEffect, useState } from 'react';

import CustomDropdown from '../CustomDropdown/CustomDropdown';

import classes from './CustomDropdownWrapper.module.css';

const CustomDropdownWrapper = props => {

  const {className, label, badgeCounter, closeDropdown, onResetCloseDropdown} = props;

  const [isOpenCDW, setIsOpenCDW] = useState(false);

  const onOpenItemClient = () => {
    setIsOpenCDW(true)
  }

  const onCloseCDW = useCallback(() => {
    setIsOpenCDW(false);
  }, [])

  useEffect(() => {
    if (closeDropdown) {
      onCloseCDW();
      onResetCloseDropdown(false)
    }
  }, [closeDropdown, onCloseCDW, onResetCloseDropdown])

  return (
    <div className={`${className} ${classes.cdwWrapper}`} onClick={onOpenItemClient}>
      {badgeCounter && <span className={classes.badge}>{badgeCounter}</span>}
      <div className={classes.cdw}>
        <p className={classes.cdwLabel}>{label}</p>
        <div className={classes.dropdownCaretWrapper}>
          <i className={classes.dropdownCaret}/>
        </div>
      </div>
      <CustomDropdown position={true} isOpenDropdown={isOpenCDW} closeDropdown={onCloseCDW}>
        {props.children}
      </CustomDropdown>
    </div>
  );

};

export default CustomDropdownWrapper;
