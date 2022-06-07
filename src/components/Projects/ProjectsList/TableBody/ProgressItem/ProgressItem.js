import { ProgressBar } from 'react-bootstrap';

import TableData from '../../../../UI/TableData/TableData';

import classes from './ProgressItem.module.css'

const ProgressItem = props => {

  return (
    <TableData>
      <div className={classes.progressBarWrapper}>
        <p>0.00%</p>
        <ProgressBar className={classes.progressBar} now={0}/>
      </div>
    </TableData>
  )
};

export default ProgressItem;
