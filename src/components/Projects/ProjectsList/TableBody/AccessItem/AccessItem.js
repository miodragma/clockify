import TableData from '../../../../UI/TableData/TableData';

import classes from './AccessItem.module.css';

const AccessItem = props => {

  const {project} = props;

  return (
    <TableData>
      <p className={classes.accessName}>{project.public ? 'Public' : '-'}</p>
    </TableData>
  );

}

export default AccessItem;
