import TableData from '../../../../UI/TableData/TableData';

import classes from './ClientItem.module.css';

const ClientItem = props => {

  const {project} = props;

  return (
    <TableData>
      <p className={classes.clientItemText}>{project.client ? project.client.name : '-'}</p>
    </TableData>
  )
};

export default ClientItem;
