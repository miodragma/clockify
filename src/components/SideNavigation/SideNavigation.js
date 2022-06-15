import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { sideNavigationData } from './sideNavigationData/side-navigation-data';

import { reviver } from '../Utils/reviver';
import { mapQueryParams } from '../Utils/mapQueryParams';

import classes from './SideNavigation.module.css';

const SideNavigation = () => {

  const {newQueryParams, defaultQueryParams} = useSelector(state => state.projects);
  const currentNewQueryParams = JSON.parse(newQueryParams, reviver);
  const currentDefaultQueryParams = JSON.parse(defaultQueryParams, reviver);

  let links = sideNavigationData.map((item, index) => {
    if (item.type === 'link') {
      let path = item.path;
      if (item.label === 'Projects') {
        path = mapQueryParams(currentNewQueryParams) ? `${item.path}${mapQueryParams(currentNewQueryParams)}` : `${item.path}${mapQueryParams(currentDefaultQueryParams)}`
      }

      return (
        <li key={index}>
          <NavLink className={classes.sidenavExpand} to={path}
                   activeClassName={classes.active}>
              <span className={classes.linkImg}>
                <img src={item.icon} alt=""/>
              </span>
            {item.label}
          </NavLink>
        </li>
      )
    } else {
      return (
        <li key={index} className={classes.divider}>
            <span className={classes.sidenavExpand}>
              <span>{item.label}</span>
            </span>
        </li>
      )
    }
  })

  return (
    <div className={classes.sidenav}>
      <nav>
        <ul className={classes.sideNavigationUl}>
          {links}
        </ul>
      </nav>
    </div>
  )
}

export default SideNavigation;
