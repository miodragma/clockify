import { useCallback, useEffect, useState } from 'react';

import CustomDropdown from '../CustomDropdown/CustomDropdown';

import addIcon from '../../../assets/add-icon.svg';

import classes from './CustomDropdownWrapper.module.css';

const CustomDropdownWrapper = props => {

  const {
    classCustomDropdownSubWrapper,
    className,
    label,
    badgeCounter,
    isBadgeCounter = true,
    closeDropdown,
    onResetCloseDropdown,
    isCloseEvent = false,
    onCloseEvent,
    isIcon,
    classNameCustomDropdown
  } = props;

  const [isOpenCDW, setIsOpenCDW] = useState(false);

  const onOpenItemClient = () => {
    setIsOpenCDW(true)
  }

  const onCloseCDW = useCallback(() => {
    setIsOpenCDW(false);
    if (isCloseEvent) {
      onCloseEvent()
    }
  }, [isCloseEvent, onCloseEvent])

  useEffect(() => {
    if (closeDropdown) {
      onCloseCDW();
      onResetCloseDropdown(false)
    }
  }, [closeDropdown, onCloseCDW, onResetCloseDropdown])

  return (
    <div className={`${className ? className : ''} ${classes.customDropdownWrapper}`} onClick={onOpenItemClient}>
      {badgeCounter && isBadgeCounter && <span className={classes.badge}>{badgeCounter}</span>}
      <div
        className={`${classes.customDropdownSubWrapper} ${classCustomDropdownSubWrapper ? classCustomDropdownSubWrapper : ''}`}>
        {isIcon && <img src={addIcon} alt="add-icon"/>}
        <p className={classes.customDropdownWrapperLabel}>{label}</p>
        <div className={classes.dropdownCaretWrapper}>
          <i className={classes.dropdownCaret}/>
        </div>
      </div>
      <CustomDropdown classNameCustomDropdown={classNameCustomDropdown} position={true} isOpenDropdown={isOpenCDW}
                      closeDropdown={onCloseCDW}>
        {props.children}
      </CustomDropdown>
    </div>
  );

};

export default CustomDropdownWrapper;
