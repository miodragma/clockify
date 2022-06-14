import { Fragment, useCallback } from 'react';

import RadioButton from '../../UI/RadioButton/RadioButton';
import CustomDropdownWrapper from '../../UI/CustomDropdownWrapper/CustomDropdownWrapper';
import Input from '../../UI/Input/Input';
import DropdownMenu from '../../UI/DropdownMenu/DropdownMenu';

import classes from './CustomFilterDropdown.module.css';

const CustomFilterDropdown = props => {

  const {
    className,
    inputLabel,
    itemsList,
    selectedListIds,
    isSelectAll,
    isWithoutClient,
    isSearchByName,
    searchByName,
    changeActive,
    changeWithout,
    changeSelectAll,
    clickCheck,
    currentDropdownData,
    isUseWithoutClient,
    currentDropdownLabelVal,
    currentInputValue
  } = props;

  const onSearchByName = useCallback(name => {
    currentInputValue !== name && searchByName(name)
  }, [currentInputValue, searchByName]);

  const onChangeActive = useCallback(active => {
    changeActive(active)
  }, [changeActive]);

  const onChangeSelectAll = useCallback(() => {
    changeSelectAll()
  }, [changeSelectAll]);

  const onChangeWithout = useCallback(() => {
    changeWithout(!isWithoutClient)
  }, [changeWithout, isWithoutClient]);

  const onClickCheck = useCallback(id => {
    clickCheck(id)
  }, [clickCheck]);

  let newItemsList = [...itemsList].map(item => {

    let isChecked = selectedListIds.some(id => id === item.id);

    return (<RadioButton
      key={item.id}
      buttonWrapper={classes.buttonWrapper}
      type='checkbox'
      isChecked={isChecked}
      label={item.name}
      changeCheckValue={() => onClickCheck(item.id)}/>)
  })

  let badge = '';

  if (selectedListIds.length) {
    badge = selectedListIds.length;
    if (isSelectAll) {
      badge = selectedListIds.length
    } else if (isWithoutClient && !selectedListIds.includes('without')) {
      badge = Number(badge) + 1
    }
  } else if (isWithoutClient) {
    badge = 1;
  }
  if (isSelectAll && isWithoutClient && selectedListIds.length) {
    badge = '...'
  }

  return (
    <CustomDropdownWrapper className={className} label='Client' badgeCounter={badge}>
      <div className={classes.inputWrapper}>
        <Input
          className={classes.input}
          type='text'
          placeholder={inputLabel}
          currentValue={currentInputValue}
          onChangeInputVal={onSearchByName}
          isDebounce={true}
          autofocus={true}/>
      </div>
      <div className={classes.scrollableItem}>
        <div className={classes.dropdownMenuWrapper}>
          <p>Show</p>
          <DropdownMenu
            currentDropdownLabel={currentDropdownLabelVal}
            className={classes.filterDropdownButton}
            dropdownMenuData={currentDropdownData}
            onChangeSelectVal={onChangeActive}/>
        </div>
        {
          itemsList?.length === 0 ? <p className={classes.noMemberLeft}>No members left</p> :
            <Fragment>
              <RadioButton
                buttonWrapper={classes.buttonWrapper}
                type='checkbox'
                isChecked={isSelectAll}
                label='Select all'
                changeCheckValue={onChangeSelectAll}/>
              {
                isUseWithoutClient && !isSearchByName && <RadioButton
                  buttonWrapper={classes.buttonWrapper}
                  type='checkbox'
                  isChecked={isWithoutClient}
                  label='Without client'
                  changeCheckValue={onChangeWithout}/>
              }
              {newItemsList}
            </Fragment>
        }
      </div>
    </CustomDropdownWrapper>
  );

};

export default CustomFilterDropdown;
