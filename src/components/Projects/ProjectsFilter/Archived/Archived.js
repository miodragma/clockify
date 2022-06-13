import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import DropdownMenu from '../../../UI/DropdownMenu/DropdownMenu';

import { dropdownArchiveData } from '../../../Services/dropdownArchiveData/dropdown-archive-data';

import classes from './Archived.module.css';

const Archived = props => {

  const {className, changeArchiveValue} = props;

  const [currentDropdownLabelVal, setCurrentDropdownLabelVal] = useState('');

  const {search} = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);

  useEffect(() => {
    for (let [key, value] of [...queryParams]) {
      if (key === 'archived') {
        const label = dropdownArchiveData.find(data => value === '' ? data.label === 'All' : data.value.toString() === value.toString())?.label;
        setCurrentDropdownLabelVal(label || '');
      }
    }
  }, [queryParams])

  const onChangeArchived = val => {
    changeArchiveValue(val)
  };

  return (
    <div className={`${className}`}>
      <DropdownMenu
        currentDropdownLabel={currentDropdownLabelVal}
        className={classes.filterDropdownButton}
        dropdownMenuData={dropdownArchiveData}
        onChangeSelectVal={onChangeArchived}/>
    </div>
  )
};

export default Archived;
