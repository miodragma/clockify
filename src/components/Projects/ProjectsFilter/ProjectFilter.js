import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { projectsActions, replacer, reviver } from '../store/projects-slice';

import { mapQueryParams } from '../../Utils/mapQueryParams';
import { Col, Row } from 'react-bootstrap';
import classes from '../../Services/ListItem/ListItem.module.css';
import DropdownMenu from '../../UI/DropdownMenu/DropdownMenu';
import { dropdownData } from '../../Clients/ClientsActions/dropdownData/dropdown-data';

let isMounted = false;

const ProjectFilter = () => {

  const {newQueryParams, defaultQueryParams} = useSelector(state => state.projects)

  const dispatch = useDispatch();

  const history = useHistory();
  const {pathname} = useLocation();

  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      return;
    }
    const currentNewQueryParams = JSON.parse(newQueryParams, reviver);
    const currentDefaultQueryParams = JSON.parse(defaultQueryParams, reviver);

    if (currentNewQueryParams.size === 0) {
      console.log(mapQueryParams(currentDefaultQueryParams))
      history.replace({pathname, search: mapQueryParams(currentDefaultQueryParams)})
    } else {
      console.log(mapQueryParams(currentNewQueryParams))
      history.replace({pathname, search: mapQueryParams(currentNewQueryParams)})
    }
  }, [defaultQueryParams, newQueryParams, pathname, history])

  const onShowBy = val => {
    console.log(val)
    const t = new Map()
    if (val !== 'empty') {
      t.set('archived', val)
    } else {
      t.set('archived', '')
    }
    dispatch(projectsActions.changeNewQueryParams(JSON.stringify(t, replacer)))
  }

  /*TODO remove all unnecessary code, this dropdown below is just for example.*/

  return (
    <div>
      <Row className={`${classes.rowItem}`}>
        <Col className={classes.colActionButtonsWrapper}>

          <div className={`${classes.actionButton} ${classes.border}`}>
            <DropdownMenu
              dropdownMenuData={dropdownData}
              onChangeSelectVal={onShowBy}/>
          </div>
          <div className={`${classes.actionButton} ${classes.border}`}>
            <DropdownMenu
              dropdownMenuData={dropdownData}
              onChangeSelectVal={onShowBy}/>
          </div>
          <div className={`${classes.actionButton} ${classes.border}`}>
            <DropdownMenu
              dropdownMenuData={dropdownData}
              onChangeSelectVal={onShowBy}/>
          </div>
          <div className={`${classes.actionButton} ${classes.border}`}>
            <DropdownMenu
              dropdownMenuData={dropdownData}
              onChangeSelectVal={onShowBy}/>
          </div>
        </Col>
        <Col>

        </Col>
      </Row>
    </div>
  )
};

export default ProjectFilter;
