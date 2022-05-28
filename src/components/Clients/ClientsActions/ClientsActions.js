import { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from '../../../axios/axiosConfig';

import Dropdown from '../../UI/Dropdown/Dropdown';
import Input from '../../UI/Input/Input';

import classes from './ClientsActions.module.css';

import { optionsData } from './OptionsData/OptionsData';

const ClientsActions = () => {

  const [newClientVal, setNewClientVal] = useState();

  const onShowByHandler = useCallback(val => {
    console.log(val)
  }, []);

  const onSearchByNameHandler = useCallback(val => {
    console.log(val)
  }, []);

  const onAddNewClientHandler = useCallback(val => {
    setNewClientVal(val)
  }, []);

  const onClickAddHandler = () => {

    axios.get('/workspaces/628bef2bd1a377427e49b939/user')
      .then(res => console.log(res))
      .catch(err => console.log(err))
  };

  return (
    <section className={classes.section}>

      <div className={classes.partSection}>
        <Dropdown
          className={classes.dropdownSelect}
          optionsData={optionsData}
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
          isDebounce={false} type='text'
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
