import { Container, Navbar } from 'react-bootstrap';
import logo from '../../assets/logo.png';

import classes from './Header.module.css';

const Header = () => {

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
    </Navbar>
  )
}

export default Header;
