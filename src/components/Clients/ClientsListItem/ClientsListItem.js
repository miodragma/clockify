import { useEffect } from 'react';

import { Col, Row } from 'react-bootstrap';

import classes from './ClientsListItem.module.css';

import editIcon from '../../../assets/edit-icon.svg';
import ellipsisIcon from '../../../assets/ellipsis-icon.svg';

const ClientsListItem = props => {

  const {client, clientId, onClickEdit} = props;

  useEffect(() => {
  }, [clientId]);

  return (
    <Row className={`${classes.rowItem}`}>
      <Col xs={5} className={classes.colItem}>
        <div>
          <p className={`${client.archived && classes.archivedItem}`}>{client.name}</p>
        </div>
      </Col>
      <Col xs={5} className={classes.colItem}>
        <div className={classes.border}>
          <p>{client.address}</p>
        </div>
      </Col>
      <Col xs={2} className={classes.colActionButtonsWrapper}>
        <div className={`${classes.actionButton} ${classes.border}`}>
          <img onClick={onClickEdit} src={editIcon} alt='edit-icon'/>
        </div>
        <div className={`${classes.actionButton} ${classes.border}`}>
          <img src={ellipsisIcon} alt='ellipsis-icon'/>
        </div>
      </Col>
    </Row>
  )
};

export default ClientsListItem;
