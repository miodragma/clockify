import { useCallback } from 'react';

import TableData from '../../../../UI/TableData/TableData';

import classes from './ClientItem.module.css';

const ClientItem = props => {

  const { project, onClickClient, className } = props;

  const onClickClientHandler = useCallback(() => {
    onClickClient();
  }, [onClickClient]);

  return (
    <TableData>
      <div onClick={onClickClientHandler} className={className}>
        <p className={classes.clientItemText}>{project.client ? project.client.name : '-'}</p>
      </div>
    </TableData>
  )
};

export default ClientItem;
