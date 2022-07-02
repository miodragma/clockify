import { useCallback } from 'react';

import TableData from '../../../../UI/TableData/TableData';

import classes from './AccessItem.module.css';

const AccessItem = props => {

  const { project, onClickAccess, className } = props;

  const onClickAccessItemHandler = useCallback(() => {
    onClickAccess();
  }, [onClickAccess]);

  return (
    <TableData>
      <div onClick={onClickAccessItemHandler} className={className}>
        <p className={classes.accessName}>{project.public ? 'Public' : 'Private'}</p>
      </div>
    </TableData>
  );

}

export default AccessItem;
