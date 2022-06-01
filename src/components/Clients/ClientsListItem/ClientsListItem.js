import { useEffect, useRef, useState } from 'react';
import useOutsideAlerter from '../../../hooks/OutsideClick';

import { Col, Row } from 'react-bootstrap';

import classes from './ClientsListItem.module.css';

import editIcon from '../../../assets/edit-icon.svg';
import ellipsisIcon from '../../../assets/ellipsis-icon.svg';
import noteIcon from '../../../assets/note-icon.svg';

const ClientsListItem = props => {

  const {client, onClickEdit, onClientItemAction} = props;
  const {id, archived, name, address, note} = client;

  const [isOpenActions, setIsOpenActions] = useState(false);

  const actionsRef = useRef(null);
  const outsideClick = useOutsideAlerter;

  useEffect(() => {
  }, [id]);

  const onCloseActions = () => {
    setIsOpenActions(false)
  }
  outsideClick({actionsRef, onCloseActions})

  const onClientOpenItemActions = () => {
    setIsOpenActions(true)
  }

  const onClientClickItemAction = action => {
    onClientItemAction(action);
    setIsOpenActions(false)
  }

  let archiveActions = ['Restore', 'Delete'];
  let notArchiveActions = ['Archive'];

  const mapActions = actionsData => actionsData.map((action, index) => {
    return (<p onClick={() => onClientClickItemAction(action)} key={index}>{action}</p>)
  });

  let actions;

  if (client.archived) {
    actions = mapActions(archiveActions)
  } else {
    actions = mapActions(notArchiveActions)
  }

  return (
    <Row className={`${classes.rowItem}`}>
      <Col xs={5} className={classes.colItem}>
        <div>
          <p className={`${archived && classes.archivedItem}`}>{name}</p>
        </div>
      </Col>
      <Col xs={5} className={classes.colItem}>
        <div className={classes.border}>
          <p>{address}</p>
        </div>
      </Col>
      <Col xs={2} className={classes.colActionButtonsWrapper}>
        {note && <div className={`${classes.actionButton} ${classes.border}`}>
          <img src={noteIcon} alt='note-icon'/>
        </div>}
        <div className={`${classes.actionButton} ${classes.border}`}>
          <img onClick={onClickEdit} src={editIcon} alt='edit-icon'/>
        </div>
        <div className={`${classes.actionButton} ${classes.border}`}>
          <img onClick={onClientOpenItemActions} src={ellipsisIcon} alt='ellipsis-icon'/>
          {isOpenActions && <div ref={actionsRef} className={classes.actionsList}>
            {actions}
          </div>}
        </div>
      </Col>
    </Row>
  )
};

export default ClientsListItem;
