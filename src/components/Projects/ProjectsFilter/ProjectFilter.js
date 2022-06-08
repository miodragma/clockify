import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Col, Row } from 'react-bootstrap';

import Archived from './Archived/Archived';

import { reviver } from '../store/projects-slice';

import { mapQueryParams } from '../../Utils/mapQueryParams';

import classes from './ProjectFilter.module.css';
import Billing from './Billing/Billing';

const ProjectFilter = () => {

  const {newQueryParams, defaultQueryParams} = useSelector(state => state.projects);
  const [changedQueryParams, setChangedQueryParams] = useState(new Map());
  const [isClearFilter, setIsClearFilter] = useState(false);

  const history = useHistory();
  const {pathname} = useLocation();

  useEffect(() => {
    setIsClearFilter(newQueryParams !== defaultQueryParams)
  }, [newQueryParams, defaultQueryParams])

  const changeArchiveValueHandler = archiveVal => {
    setChangedQueryParams(changedQueryParams.set('archived', archiveVal !== 'empty' ? archiveVal : ''))
  }

  const changeBillingHandler = useCallback(billing => {
    setChangedQueryParams(changedQueryParams.set('billable', billing))
  }, [changedQueryParams]);

  const applyFilterHandler = () => {
    const queryParams = new Map(JSON.parse(newQueryParams, reviver));
    changedQueryParams.forEach((value, key) => queryParams.set(key, value));
    history.replace({pathname, search: mapQueryParams(queryParams)})
  };

  const clearFilterHandler = () => {
    const queryParams = new Map(JSON.parse(defaultQueryParams, reviver));
    setChangedQueryParams(new Map())
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
