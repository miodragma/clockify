import Header from '../Header/Header';
import SideNavigation from '../SideNavigation/SideNavigation';
import Toast from '../UI/Toast/Toast';

import classes from './Layout.module.css';

const Layout = props => {
  return <div>
    <Header/>
    <SideNavigation/>
    <main className={classes.layoutMain}>
      {props.children}
    </main>
    <Toast/>
  </div>
}

export default Layout;
