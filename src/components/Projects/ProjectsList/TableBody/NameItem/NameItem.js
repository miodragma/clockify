import { useCallback } from 'react';

import TableData from '../../../../UI/TableData/TableData';

import classes from './NameItem.module.css';

const NameItem = props => {

  const { project, onClickName, className } = props;

  const onClickNameHandler = useCallback(() => {
    onClickName();
  }, [onClickName])

  return (
    <TableData className={classes.nameItemWrapper}>
      <div onClick={onClickNameHandler} className={className}>
        <i className={classes.icon} style={{ backgroundColor: project.color }}/>
        <p className={`${classes.name} ${project.archived && classes.archivedItem}`}>{project.name}</p>
      </div>
    </TableData>
  )
};

export default NameItem;
