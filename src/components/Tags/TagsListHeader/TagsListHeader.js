import { Col, Row } from 'react-bootstrap';

import classes from '../../Clients/ClientListHeader/ClientListHeader.module.css';

const TagsListHeader = () => {
  return (
    <Row className={classes.rowHeader}>
      <Col xs={5}>
        <p className={classes.colLabel}>Name</p>
      </Col>
    </Row>
  )
};

export default TagsListHeader;
