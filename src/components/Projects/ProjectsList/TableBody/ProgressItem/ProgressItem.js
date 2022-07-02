import { useCallback } from 'react';
import { ProgressBar } from 'react-bootstrap';

import TableData from '../../../../UI/TableData/TableData';

import classes from './ProgressItem.module.css'

const ProgressItem = props => {

  const {onClickProgress} = props;

  const onClickProgressItemHandler = useCallback(() => {
    onClickProgress();
  }, [onClickProgress]);

  return (
    <TableData>
      <div onClick={onClickProgressItemHandler} className={classes.progressBarWrapper}>
        <p>0.00%</p>
        <ProgressBar className={classes.progressBar} now={0}/>
      </div>
    </TableData>
  )
};

export default ProgressItem;
