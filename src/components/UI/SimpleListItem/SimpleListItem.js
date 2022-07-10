import { useCallback, useEffect, useState } from 'react';

import { Col, Row } from 'react-bootstrap';

import CustomDropdown from '../CustomDropdown/CustomDropdown';

import noteIcon from '../../../assets/note-icon.svg';
import editIcon from '../../../assets/edit-icon.svg';
import ellipsisIcon from '../../../assets/ellipsis-icon.svg';

import classes from './SimpleListItem.module.css';

/* Clients and Tags list item */

const SimpleListItem = props => {

  const { data, onClickEdit, onItemAction, type } = props;
  const { id, archived, name, address, note } = data;

  const [isOpenActions, setIsOpenActions] = useState(false);

  useEffect(() => {
  }, [id]);

  const onCloseActions = useCallback(() => {
    setIsOpenActions(false)
  }, [])

  const onOpenItemActions = () => {
    setIsOpenActions(true)
  }

  const onClickItemAction = action => {
    onItemAction(action);
    setIsOpenActions(false)
  }

  let archiveActions = ['Restore', 'Delete'];
  let notArchiveActions = ['Archive'];

  const mapActions = actionsData => actionsData.map((action, index) => {
    return (<p onClick={() => onClickItemAction(action)} key={index}>{action}</p>)
  });

  let actions;

  if (data.archived) {
    actions = mapActions(archiveActions)
  } else {
    actions = mapActions(notArchiveActions)
  }

  return (
    <Row className='rowItem'>
      <Col xs={type === 'clients' ? 5 : null} className={classes.colItem}>
        <div>
          <p className={`${archived && classes.archivedItem}`}>{name}</p>
        </div>
      </Col>
      {type === 'client' && <Col xs={5} className={classes.colItem}>
        <div className={classes.border}>
          <p>{address}</p>
        </div>
      </Col>}
      <Col xs={2} className={classes.colActionButtonsWrapper}>
        {note && <div className={`${classes.actionButton} ${classes.border}`}>
          <img src={noteIcon} alt='note-icon'/>
        </div>}
        <div className={`${classes.actionButton} ${classes.border}`}>
          <img onClick={onClickEdit} src={editIcon} alt='edit-icon'/>
        </div>
        <div className={`${classes.actionButton} ${classes.border}`}>
          <img onClick={onOpenItemActions} src={ellipsisIcon} alt='ellipsis-icon'/>
          <CustomDropdown isOpenDropdown={isOpenActions} closeDropdown={onCloseActions}>
            {actions}
          </CustomDropdown>
        </div>
      </Col>
    </Row>
  )
};

export default SimpleListItem;
