import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import searchIcon from '../../../../assets/search-icon.svg';

import classes from './Search.module.css';

const Search = props => {

  const {className, onProjectNameChange} = props;

  const [projectName, setProjectName] = useState('');

  const {search} = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);

  useEffect(() => {
    const currentProjectName = queryParams.get('name');
    setProjectName(currentProjectName)
  }, [queryParams])

  const onChangeProjectNameHandler = e => {
    const name = e.target.value;
    const data = {
      name
    };
    setProjectName(name);
    onProjectNameChange(data);
  }

  return (
    <div className={classes.searchWrapper}>
      <div className={`${className} ${classes.iconWrapper}`}>
        <img src={searchIcon} alt="searchIcon"/>
      </div>
      <Form.Group className={classes.formGroup}>
        <Form.Control
          className={classes.input}
          value={projectName}
          onChange={onChangeProjectNameHandler}
          type='text'
          placeholder='Project name'/>
      </Form.Group>
    </div>
  )

};

export default Search;
