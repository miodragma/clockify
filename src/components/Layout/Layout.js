import Header from '../Header/Header';
import SideNavigation from '../SideNavigation/SideNavigation';

import classes from './Layout.module.css';

const Layout = props => {
  return <div>
    <Header/>
    <SideNavigation/>
    <main className={classes.layoutMain}>
      {props.children}
    </main>
  </div>
}

export default Layout;
