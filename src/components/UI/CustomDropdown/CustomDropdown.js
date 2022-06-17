import { Fragment, useRef } from 'react';

import outsideClick from '../../../hooks/OutsideClick';

import classes from './CustomDropdown.module.css';

const CustomDropdown = props => {

  const {isOpenDropdown, className, closeDropdown, position} = props;

  const actionsRef = useRef(null);

  const onCloseDropdown = () => {
    closeDropdown()
  }

  outsideClick({actionsRef, onCloseDropdown})

  return (
    <Fragment>
      {isOpenDropdown && <div
        ref={actionsRef}
        className={`${className || classes.defaultActionsList} ${position ? classes.left : classes.right}`}>
        {props.children}
      </div>}
    </Fragment>
  )
};

export default CustomDropdown;
