import { Fragment, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import { tabsData } from './tabsData/tabs-data';

import classes from './ProjectEdit.module.css';

const ProjectEdit = props => {

  const history = useHistory();
  const {pathname} = useLocation();
  const hash = history.location.hash.replace('#', '');

  useEffect(() => {

  }, [])

  const onChangeHashHandler = hash => {
    history.push({pathname, hash})
  }

  const tabs = tabsData.map((item, index) => {
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
      <Nav variant="tabs" defaultActiveKey={hash.replace('#', 'tasks')}>
        {tabs}
      </Nav>
      <div className={classes.editContent}>

      </div>
    </Fragment>
  )

};

export default ProjectEdit;
