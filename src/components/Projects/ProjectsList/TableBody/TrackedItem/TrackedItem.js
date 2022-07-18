import { useCallback } from 'react';

import TableData from '../../../../UI/TableData/TableData';

import classes from './TrackedItem.module.css';
import { calculateTracked } from '../../../../Utils/calculateTracked';

const TrackedItem = props => {

  const { project, onClickTracked, className } = props;
  const { duration, estimate } = project;

  const trackedTime = calculateTracked(duration, estimate.estimate);

  const onClickTrackedHandler = useCallback(() => {
    onClickTracked()
  }, [onClickTracked]);

  return (
    <TableData>
      <div onClick={onClickTrackedHandler} className={className}>
        <p className={classes.duration}>{trackedTime.getDuration}h</p>
        {(estimate.type === 'MANUAL' && trackedTime.getEstimateHour) &&
          <p className={classes.estimate}>of {trackedTime.getEstimate}h</p>}
      </div>
    </TableData>
  )
};

export default TrackedItem;
