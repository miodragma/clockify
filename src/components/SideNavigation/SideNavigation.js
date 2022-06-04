import { NavLink } from 'react-router-dom';

import { sideNavigationData } from './sideNavigationData/side-navigation-data';

import classes from './SideNavigation.module.css';

const SideNavigation = () => {

  let links = sideNavigationData.map((item, index) => {
    if (item.type === 'link') {
      return (
        <li key={index}>
          <NavLink className={classes.sidenavExpand} to={item.path}
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
