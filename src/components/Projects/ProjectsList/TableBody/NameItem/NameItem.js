import { useCallback } from 'react';

import TableData from '../../../../UI/TableData/TableData';

import classes from './NameItem.module.css';

const NameItem = props => {

  const {project, onClickName} = props;

  const onClickNameHandler = useCallback(() => {
    onClickName();
  }, [onClickName])

  return (
    <TableData className={classes.nameItemWrapper} onClickTableData={onClickNameHandler}>
      <i className={classes.icon} style={{backgroundColor: project.color}}/>
      <p className={`${classes.name} ${project.archived && classes.archivedItem}`}>{project.name}</p>
    </TableData>
  )
};

export default NameItem;
