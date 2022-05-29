import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'react-bootstrap';

import DropdownMenu from '../../UI/DropdownMenu/DropdownMenu';
import Input from '../../UI/Input/Input';

import classes from './ClientsActions.module.css';

import { dropdownData } from './DropdownData/DropdownData';
import { addNewClient, fetchClientsData } from '../store/clients-actions';

const ClientsActions = () => {

  const [newClientVal, setNewClientVal] = useState('');
  const archivedVal = useRef('');
  const nameVal = useRef('');

  const dispatch = useDispatch();
  const {activeWorkspace} = useSelector(state => state.user.user);

  const onShowByHandler = useCallback(archived => {
    archivedVal.current = archived;
    dispatch(fetchClientsData({workspaceId: activeWorkspace, archived, name: nameVal.current}))
  }, [dispatch, activeWorkspace]);

  const onSearchByNameHandler = useCallback(name => {
    nameVal.current = name;
    dispatch(fetchClientsData({workspaceId: activeWorkspace, archived: archivedVal.current, name}));
  }, [dispatch, activeWorkspace]);

  const onAddNewClientHandler = useCallback(val => {
    setNewClientVal(val)
  }, []);

  const onClickAddHandler = () => {
    dispatch(addNewClient({workspaceId: activeWorkspace, name: newClientVal}))
  };

  return (
    <section className={classes.section}>

      <div className={classes.partSection}>
        <DropdownMenu
          dropdownMenuData={dropdownData}
          onChangeSelectVal={onShowByHandler}/>
        <Input
          className={classes.inputFiled}
          isDebounce={true}
          type='text'
          placeholder='Search by name'
          onChangeInputVal={onSearchByNameHandler}/>
      </div>

      <div className={classes.partSection}>
        <Input
          className={classes.inputFiled}
          isDebounce={false}
          type='text'
          placeholder='Add new client'
          onChangeInputVal={onAddNewClientHandler}/>
        <Button
          onClick={onClickAddHandler}
          className={`${classes.addButton} primary`}
          disabled={!newClientVal}>Add
        </Button>
      </div>

    </section>
  )
};

export default ClientsActions;
