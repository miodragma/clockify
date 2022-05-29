import { Container, Navbar } from 'react-bootstrap';
import logo from '../../assets/logo.png';

import classes from './Header.module.css';
import Loader from '../UI/Loader/Loader';
import { useSelector } from 'react-redux';

const Header = () => {

  const isLoader = useSelector(state => state.loader.isLoader);

  return (
    <Navbar expand="lg" className={classes.navbar} fixed="top">
      <Container fluid>
        <div className={classes.navbarLeftWrapper}>
          <button className={classes.menuButton}><span className={classes.menuIcon}/></button>
          <div className={classes.logoWrapper}>
            <img src={logo} alt="clocify"/>
          </div>
        </div>
      </Container>
      {isLoader && <Loader/>}
    </Navbar>
  )
}

export default Header;
