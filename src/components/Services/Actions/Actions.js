import { Button } from 'react-bootstrap';

import DropdownMenu from '../../UI/DropdownMenu/DropdownMenu';
import Input from '../../UI/Input/Input';

import classes from './Actions.module.css';

/* Clients, Tags, ProjectsEdit, above table actions */

const Actions = props => {

  const {
    addNewLabel,
    dropdownData,
    onShowBy,
    onSearchByName,
    isNewAdded,
    onAddNew,
    inputValIsEmpty,
    onClickAdd,
    isNewVal
  } = props;

  return (
    <section className={classes.section}>

      <div className={classes.partSection}>
        <DropdownMenu
          dropdownMenuData={dropdownData}
          onChangeSelectVal={onShowBy}/>
        <Input
          className={classes.inputFiled}
          isDebounce={true}
          type='text'
          placeholder='Search by name'
          onChangeInputVal={onSearchByName}/>
      </div>

      <div className={classes.partSection}>
        <Input
          className={classes.inputFiled}
          isDebounce={false}
          isNewAdded={isNewAdded}
          type='text'
          placeholder={addNewLabel}
          onChangeInputVal={onAddNew}
          inputValIsEmpty={inputValIsEmpty}/>
        <Button
          onClick={onClickAdd}
          className={`${classes.addButton} primary`}
          disabled={!isNewVal}>Add
        </Button>
      </div>

    </section>
  )
};

export default Actions;
