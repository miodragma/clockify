import { Container } from 'react-bootstrap';

import classes from './MainCard.module.css';

const MainCard = props => {
  return (
    <div className={classes.mainCardWrapper}>
      <Container fluid>
        {props.children}
      </Container>
    </div>
  )
};

export default MainCard;
