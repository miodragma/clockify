import { Col, Row } from 'react-bootstrap';

import classes from './ClientListHeader.module.css';

const ClientListHeader = () => {
  return (
    <Row className={classes.rowHeader}>
      <Col xs={5}>
        <p className={classes.colLabel}>Name</p>
      </Col>
      <Col xs={7}>
        <p className={classes.colLabel}>Address</p>
      </Col>
    </Row>
  )
}

export default ClientListHeader;
