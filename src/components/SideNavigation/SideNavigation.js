import { NavLink } from 'react-router-dom';

import * as routeConstants from '../../route/RouteConstants';

import timeIcon from '../../assets/time-icon.svg';
import clientsIcon from '../../assets/clients-icon.svg';
import tagsIcon from '../../assets/tags-icon.svg';

import classes from './SideNavigation.module.css';

const SideNavigation = () => {
  return (
    <div className={classes.sidenav}>
      <nav>
        <ul className={classes.sideNavigationUl}>
          <li>
            <NavLink className={classes.sidenavExpand} to={`/${routeConstants.TRACKER}`}
                     activeClassName={classes.active}>
              <span className={classes.linkImg}>
                <img src={timeIcon} alt=""/>
              </span>
              Time Tracker
            </NavLink>
          </li>
          <li className={classes.divider}>
            <span className={classes.sidenavExpand}>
              <span>Manage</span>
            </span>
          </li>
          <li>
            <NavLink className={classes.sidenavExpand} to={`/${routeConstants.CLIENTS}`}
                     activeClassName={classes.active}>
              <span className={classes.linkImg}>
                <img src={clientsIcon} alt=""/>
              </span>
              Clients
            </NavLink>
          </li>
          <li>
            <NavLink className={classes.sidenavExpand} to={`/${routeConstants.TAGS}`}
                     activeClassName={classes.active}>
              <span className={classes.linkImg}>
                <img src={tagsIcon} alt=""/>
              </span>
              Tags
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SideNavigation;
