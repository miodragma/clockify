import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import Tasks from './Tasks/Tasks';
import Access from './Access/Access';
import Status from './Status/Status';
import Note from './Note/Note';
import Settings from './Settings/Settings';

import { tabsData } from './dropdownData/tabs-data';

import classes from './ProjectEdit.module.css';

const ProjectEdit = props => {

  const history = useHistory();
  const { pathname } = useLocation();
  const hash = history.location.hash.replace('#', '');

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
      <Nav variant="tabs" defaultActiveKey='tasks'>
        {tabs}
      </Nav>
      <div className={classes.editContent}>
        {hash === 'tasks' && <Tasks/>}
        {hash === 'access' && <Access/>}
        {hash === 'status' && <Status/>}
        {hash === 'note' && <Note/>}
        {hash === 'settings' && <Settings/>}
      </div>
    </Fragment>
  )

};

export default ProjectEdit;
