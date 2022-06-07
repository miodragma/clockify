import { Row } from 'react-bootstrap';

import classes from './ListHeaderRow.module.css';

const ListHeaderRow = props => {

  return (
    <Row className={classes.rowHeader}>
      {props.children}
    </Row>
  )
}

export default ListHeaderRow;
