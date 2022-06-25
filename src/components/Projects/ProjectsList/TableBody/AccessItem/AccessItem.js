import { useCallback } from 'react';

import TableData from '../../../../UI/TableData/TableData';

import classes from './AccessItem.module.css';

const AccessItem = props => {

  const {project, onClickAccess} = props;

  const onClickAccessItemHandler = useCallback(() => {
    onClickAccess();
  }, [onClickAccess]);

  return (
    <TableData onClickTableData={onClickAccessItemHandler}>
      <p className={classes.accessName}>{project.public ? 'Public' : '-'}</p>
    </TableData>
  );

}

export default AccessItem;
