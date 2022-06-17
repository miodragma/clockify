import { Container } from 'react-bootstrap';

import classes from './MainCard.module.css';

const MainCard = props => {
  return (
    <div className={classes.mainCardWrapper}>
      <Container className={classes.container} fluid>
        {props.children}
      </Container>
    </div>
  )
};

export default MainCard;
