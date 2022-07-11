import { useEffect, useRef, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import PropTypes from 'prop-types';

import classes from './DropdownMenu.module.css';

const DropdownMenu = props => {

  const isMounted = useRef(true);
  const [activeFilterName, setActiveFilterName] = useState('');

  const {currentDropdownLabel, dropdownMenuData, onChangeSelectVal, className} = props;
  const filterNameRef = useRef('');

  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
      const findFilterName = dropdownMenuData[0].label
      setActiveFilterName(findFilterName);
      filterNameRef.current = findFilterName;
    }

    if (currentDropdownLabel && currentDropdownLabel !== filterNameRef.current) {
      filterNameRef.current = currentDropdownLabel
      setActiveFilterName(currentDropdownLabel)
    }
  }, [activeFilterName, dropdownMenuData, currentDropdownLabel])

  const options = dropdownMenuData && dropdownMenuData.map((item, index) => {

    const isDisable = item.hasOwnProperty('disabled') ? item.disabled : false;

    return (
      <div
        className={`
        ${activeFilterName === item.label ? classes.activeDropdownItem : ''}
        ${classes.dropdownItem}
        ${isDisable ? classes.disableDropdownItem : ''}
        `}
        key={index}
        onClick={() => onChangeSelectValHandler(item)}>
        <Dropdown.Item>{item.label}</Dropdown.Item>
      </div>)
  })

  const onChangeSelectValHandler = item => {
    if (activeFilterName !== item.label) {
      setActiveFilterName(item.label);
      onChangeSelectVal(item.value)
    }
  }

  return (
    <DropdownButton className={`${classes.dropdownButton} ${className || classes.defaultDropdownButton}`}
                    title={activeFilterName}>
      <div className={classes.optionsWrapper}>
        {options}
      </div>
    </DropdownButton>
  )
};

export default DropdownMenu;

DropdownMenu.propTypes = {
  optionsData: PropTypes.array,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  label: PropTypes.string
}
