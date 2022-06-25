import { useCallback } from 'react';

import TableData from '../../../../UI/TableData/TableData';

import classes from './ClientItem.module.css';

const ClientItem = props => {

  const {project, onClickClient} = props;

  const onClickClientHandler = useCallback(() => {
    onClickClient();
  }, [onClickClient]);

  return (
    <TableData onClickTableData={onClickClientHandler}>
      <p className={classes.clientItemText}>{project.client ? project.client.name : '-'}</p>
    </TableData>
  )
};

export default ClientItem;
