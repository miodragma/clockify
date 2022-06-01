import { useEffect, useRef, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import PropTypes from 'prop-types';

import classes from './DropdownMenu.module.css';

const DropdownMenu = props => {

  const isMounted = useRef(true);
  const [activeFilterName, setActiveFilterName] = useState('');

  const {dropdownMenuData, onChangeSelectVal} = props;

  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
      const findFilterName = dropdownMenuData[0].label
      setActiveFilterName(findFilterName);
    }
  }, [activeFilterName, dropdownMenuData])

  const options = dropdownMenuData && dropdownMenuData.map((item, index) => {
    return (
      <div
        className={`${activeFilterName === item.label ? classes.activeDropdownItem : ''} ${classes.dropdownItem}`}
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
    <DropdownButton className={classes.dropdownButton} title={activeFilterName}>
      <div className={classes.optionsWrapper}>
        {options}
      </div>
      {/*{options}*/}
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
