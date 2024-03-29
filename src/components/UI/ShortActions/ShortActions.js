import { Button } from 'react-bootstrap';

import DropdownMenu from '../DropdownMenu/DropdownMenu';
import Input from '../Input/Input';

import classes from './ShortActions.module.css';

/* Clients, Tags, ProjectsEdit, TeamMembers above table actions */

const ShortActions = props => {

  const {
    addNewLabel,
    dropdownData,
    onShowBy,
    onSearchByName,
    isNewAdded,
    onAddNew,
    inputValIsEmpty,
    onClickAdd,
    isNewVal,
    isAddInput = true,
    searchInputPlaceholder = 'Search by name',
    buttonLabel = 'Add',
    inputFieldClassName,
    currentDropdownLabel,
    currentValue
  } = props;

  return (
    <section className={classes.section}>

      <div className={classes.partSection}>
        <DropdownMenu
          currentDropdownLabel={currentDropdownLabel}
          dropdownMenuData={dropdownData}
          onChangeSelectVal={onShowBy}/>
        <Input
          currentValue={currentValue}
          className={`${classes.inputFiled} ${inputFieldClassName ? inputFieldClassName : ''}`}
          isDebounce={true}
          type='text'
          placeholder={searchInputPlaceholder}
          onChangeInputVal={onSearchByName}/>
      </div>

      <div className={classes.partSection}>
        {isAddInput && <Input
          className={classes.inputFiled}
          isDebounce={false}
          isNewAdded={isNewAdded}
          type='text'
          placeholder={addNewLabel}
          onChangeInputVal={onAddNew}
          inputValIsEmpty={inputValIsEmpty}/>}
        <Button
          onClick={onClickAdd}
          className={`${classes.addButton} primary`}
          disabled={!isNewVal}>{buttonLabel}
        </Button>
      </div>

    </section>
  )
};

export default ShortActions;
