import { useCallback } from 'react';

import TableData from '../../../../UI/TableData/TableData';

import classes from './TrackedItem.module.css';

const TrackedItem = props => {

  const { project, onClickTracked, className } = props;
  const { duration, estimate } = project;

  const totalSeconds = time => {
    let parts = time.split(':');
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  const getTimeValue = data => {
    const val = data.val
    return val.substring(
      val.indexOf(data.from) + 1,
      val.lastIndexOf(data.to)
    );
  }

  const time = timeElapsed => {
    const cutTimeElapsed = timeElapsed.slice(2);
    let minute = getTimeValue({val: cutTimeElapsed, from: 'H', to: 'M'});
    let seconds = getTimeValue({val: cutTimeElapsed, from: 'M', to: 'S'});

    const calcLength = tVal => tVal.length !== 2 ? `0${tVal}` : tVal;

    return `00:${calcLength(minute)}:${calcLength(seconds)}`;
  }

  const calcLength = val => val.length !== 2 ? `0.0${Math.round(val)}` : `0.${val}`

  const calculate = time => (100 * totalSeconds(time) / totalSeconds('00:59:59')).toFixed(2);

  const getHour = val => getTimeValue({val, from: 'T', to: 'H'});

  const calculated = val => calculate(time(val));

  const getDurationHour = getHour(duration.slice(2));
  const getEstimateHour = getHour(estimate.estimate.slice(2));

  const getRestWithHour = val => cutPT(calculated(val)) || '00';

  const cutPT = val => val.substring(0, val.lastIndexOf("."))

  const getDuration = getDurationHour ? `${getDurationHour}.${getRestWithHour(duration)}` : calcLength(calculated(duration));

  const getEstimate = getEstimateHour ? `${getEstimateHour}.${getRestWithHour(estimate.estimate)}` : calcLength(calculated(estimate.estimate));

  const onClickTrackedHandler = useCallback(() => {
    onClickTracked()
  }, [onClickTracked]);

  return (
    <TableData>
      <div onClick={onClickTrackedHandler} className={className}>
        <p className={classes.duration}>{getDuration}h</p>
        {estimate.type === 'MANUAL' && <p className={classes.estimate}>of {getEstimate}h</p>}
      </div>
    </TableData>
  )
};

export default TrackedItem;
