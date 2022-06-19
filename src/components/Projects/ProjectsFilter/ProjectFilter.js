import { Fragment, useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row } from 'react-bootstrap';

import Archived from './Archived/Archived';
import Client from './Client/Client';
import Access from './Access/Access';
import Billing from './Billing/Billing';
import Search from './Search/Search';


import { mapQueryParams } from '../../Utils/mapQueryParams';
import { reviver } from '../../Utils/reviver';

import { fetchClientsData } from '../../Clients/store/clients-actions';

import { dropdownArchiveData } from '../../Services/dropdownArchiveData/dropdown-archive-data';

import classes from './ProjectFilter.module.css';

const ProjectFilter = () => {

  const {newQueryParams, defaultQueryParams} = useSelector(state => state.projects);
  const [changedQueryParams, setChangedQueryParams] = useState(new Map());
  const [isClearFilter, setIsClearFilter] = useState(false);

  const {activeWorkspace: workspaceId} = useSelector(state => state.user.user);

  const dispatch = useDispatch();

  const history = useHistory();
  const {pathname} = useLocation();

  useEffect(() => {
    setIsClearFilter(newQueryParams !== defaultQueryParams)
  }, [newQueryParams, defaultQueryParams])

  const onFilterHandler = useCallback(data => {
    for (const [key, value] of Object.entries(data)) {
      setChangedQueryParams(changedQueryParams.set(key, value))
    }
  }, [changedQueryParams])

  const applyFilterHandler = () => {
    const queryParams = new Map(JSON.parse(newQueryParams, reviver));
    changedQueryParams.forEach((value, key) => queryParams.set(key, value));
    history.replace({pathname, search: mapQueryParams(queryParams)})
  };

  const clearFilterHandler = () => {
    const queryParams = new Map(JSON.parse(defaultQueryParams, reviver));
    setChangedQueryParams(new Map())

    const archived = dropdownArchiveData.find(data => data.label.toUpperCase() === queryParams.get('client-status')).value;
    dispatch(fetchClientsData({workspaceId, archived, page: 'projects'}))
    history.replace({pathname, search: mapQueryParams(queryParams)})
  }

  return (
    <Fragment>
      <div className={`${classes.rowItemBorder} ${classes.rowContent} rowItem`}>
        <div className={classes.filterActionButtonsWrapper}>
          <div className={classes.filterTitle}>
            <p>Filter</p>
          </div>
          <Archived
            className={classes.border}
            changeArchiveValue={onFilterHandler}/>
          <Client className={classes.border} onClientFiler={onFilterHandler}/>
          <Access className={classes.border} onUserGroupFiler={onFilterHandler}/>
          <Billing className={classes.border} onBillingChange={onFilterHandler}/>
        </div>
        <div className={classes.searchApplyWrapper}>
          <Search className={classes.border} onProjectNameChange={onFilterHandler}/>
          <div className={classes.applyFilterButtonCol}>
            <Button
              onClick={applyFilterHandler}
              className='primary'>Apply Filter
            </Button>
          </div>
        </div>
      </div>
      <Row className={classes.clearFilterButtonRow}>
        {isClearFilter && <Button className={classes.clearFilterButton} variant="link" onClick={clearFilterHandler}>Clear
          filters</Button>}
      </Row>
    </Fragment>
  )
};

export default ProjectFilter;
