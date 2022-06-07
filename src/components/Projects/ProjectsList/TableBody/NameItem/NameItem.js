import TableData from '../../../../UI/TableData/TableData';

import classes from './NameItem.module.css';

const NameItem = props => {

  const {project} = props;

  return (
    <TableData className={classes.nameItemWrapper}>
      <i className={classes.icon} style={{backgroundColor: project.color}}/>
      <p className={`${classes.name} ${project.archived && classes.archivedItem}`}>{project.name}</p>
    </TableData>
  )
};

export default NameItem;
