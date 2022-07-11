import { Fragment, useCallback } from 'react';

import CustomCheckButton from '../CustomCheckButton/CustomCheckButton';
import CustomDropdownWrapper from '../CustomDropdownWrapper/CustomDropdownWrapper';
import Input from '../Input/Input';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

import classes from './CustomFilterDropdown.module.css';

const CustomFilterDropdown = props => {

  const {
    className,
    inputLabel,
    itemsList,
    users,
    groups,
    selectedListIds,
    isSelectAll,
    isWithoutClient,
    isSearchByName,
    isFromAccess = false,
    isSelectAllCheckbox = true,
    searchByName,
    changeActive,
    changeWithout,
    changeSelectAll,
    clickCheck,
    currentDropdownData,
    isUseWithoutClient,
    currentDropdownLabelVal,
    currentInputValue,
    dropdownLabel,
    onCloseEvent,
    isCloseEvent,
    isBadgeCounter,
    classCustomDropdownSubWrapper
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

  let newItemsList;

  if (!isFromAccess) {
    newItemsList = [...itemsList].map(item => {

      let isChecked = selectedListIds.some(id => id === item.id);

      return (<CustomCheckButton
        key={item.id}
        buttonWrapper={`${classes.buttonWrapper} ${classes.buttonWrapperBorder}`}
        type='checkbox'
        isChecked={isChecked}
        label={item.name}
        changeCheckValue={() => onClickCheck(item.id)}/>)
    })
  } else {
    let user = false;
    let group = false;
    let divider;

    const usersGroupsList = currentDropdownLabelVal === 'Active' ? [...groups, ...users] : [...users]
    newItemsList = usersGroupsList.map(item => {

      if (groups.length && !group && groups[0].id === item.id) {
        divider = <p className={classes.divider}>Groups</p>
        group = true;
      }
      if (users.length && !user && users[0].id === item.id) {
        divider = <p className={classes.divider}>Users</p>
        user = true;
      }
      let isChecked = selectedListIds.some(id => id === item.id);

      return (
        <Fragment key={item.id}>
          {divider}
          <CustomCheckButton
            buttonWrapper={classes.buttonWrapper}
            type='checkbox'
            isChecked={isChecked}
            label={item.name}
            changeCheckValue={() => onClickCheck(item.id)}/>
        </Fragment>)
    })
  }

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

  const onCloseEventHandler = useCallback(() => {
    onCloseEvent()
  }, [onCloseEvent])

  return (
    <CustomDropdownWrapper
      classCustomDropdownSubWrapper={classCustomDropdownSubWrapper}
      className={className}
      label={dropdownLabel}
      badgeCounter={badge}
      isCloseEvent={isCloseEvent}
      onCloseEvent={onCloseEventHandler}
      isBadgeCounter={isBadgeCounter}
    >
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
          newItemsList?.length === 0 ? <p className={classes.noMemberLeft}>No members left</p> :
            <Fragment>
              {
                isSelectAllCheckbox && <CustomCheckButton
                  buttonWrapper={classes.buttonWrapper}
                  type='checkbox'
                  isChecked={isSelectAll}
                  label='Select all'
                  changeCheckValue={onChangeSelectAll}/>}
              {
                isUseWithoutClient && !isSearchByName && <CustomCheckButton
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
