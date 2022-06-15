import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row } from 'react-bootstrap';

import Archived from './Archived/Archived';
import Billing from './Billing/Billing';
import Client from './Client/Client';

import { mapQueryParams } from '../../Utils/mapQueryParams';
import { reviver } from '../../Utils/reviver';

import { fetchClientsData } from '../../Clients/store/clients-actions';

import { dropdownArchiveData } from '../../Services/dropdownArchiveData/dropdown-archive-data';

import classes from './ProjectFilter.module.css';
import Access from './Access/Access';

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

  const changeArchiveValueHandler = useCallback(archiveVal => {
    setChangedQueryParams(changedQueryParams.set('archived', archiveVal !== 'empty' ? archiveVal : ''))
  }, [changedQueryParams]);

  const changeBillingHandler = useCallback(billing => {
    setChangedQueryParams(changedQueryParams.set('billable', billing))
  }, [changedQueryParams]);

  const onClientFilterHandler = useCallback(data => {
    for (const [key, value] of Object.entries(data)) {
      setChangedQueryParams(changedQueryParams.set(key, value))
    }
  }, [changedQueryParams])

  const onUserGroupFilerHandler = useCallback(data => {
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
    <div>
      <Row className={`${classes.rowItemBorder} rowItem`}>
        <Col xs={4} className={classes.filterActionButtonsWrapper}>
          <div className={classes.filterTitle}>
            <p>Filter</p>
          </div>
          <Archived
            className={classes.border}
            changeArchiveValue={changeArchiveValueHandler}/>
          <Client className={classes.border} onClientFiler={onClientFilterHandler}/>
          <Access className={classes.border} onUserGroupFiler={onUserGroupFilerHandler}/>
          <Billing onBillingChange={changeBillingHandler} className={classes.border}/>
        </Col>
        <Col xs={6}>

        </Col>
        <Col xs={2} className={classes.applyFilterButtonCol}>
          <Button
            onClick={applyFilterHandler}
            className='primary'>Apply Filter
          </Button>
        </Col>
      </Row>
      <Row className={classes.clearFilterButtonRow}>
        {isClearFilter && <Button className={classes.clearFilterButton} variant="link" onClick={clearFilterHandler}>Clear
          filters</Button>}
      </Row>
    </div>
  )
};

export default ProjectFilter;
