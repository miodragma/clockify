import { Fragment, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import classes from './CustomTabs.module.css';

const CustomTabs = props => {

  const { linksData, children, defaultActiveTab, hash, currQueryParams } = props;

  const history = useHistory();
  const { pathname } = useLocation();

  const isMounted = useRef(true);

  useEffect(() => {
    if (hash === 'members' && currQueryParams && isMounted.current) {
      history.push({ pathname, hash, search: currQueryParams })
      isMounted.current = false;
    }
  }, [currQueryParams, hash, history, pathname])

  const onChangeHashHandler = hash => {
    if (hash === 'members') {
      history.push({ pathname, hash, search: currQueryParams })
    } else {
      history.push({ pathname, hash })
    }
  }

  const tabs = linksData.map((item, index) => {
    return (
      <Nav.Item key={index}>
        <Nav.Link
          onClick={() => onChangeHashHandler(item.value)}
          className={`${classes.navItem} ${hash === item.value ? classes.active : ''}`}
          eventKey={item.value}>{item.label}
        </Nav.Link>
      </Nav.Item>
    )
  })

  return (
    <Fragment>
      <Nav variant="tabs" defaultActiveKey={defaultActiveTab}>
        {tabs}
      </Nav>
      <div className={classes.editContent}>
        {children}
      </div>
    </Fragment>
  )

};

export default CustomTabs;
