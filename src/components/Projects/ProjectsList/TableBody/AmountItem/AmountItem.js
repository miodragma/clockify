import { useCallback } from 'react';

import TableData from '../../../../UI/TableData/TableData';

import classes from './AmountItem.module.css';

const AmountItem = props => {

  const { onClickAmount, className } = props;

  const onClickAmountItemHandler = useCallback(() => {
    onClickAmount()
  }, [onClickAmount]);

  return (
    <TableData>
      <div onClick={onClickAmountItemHandler} className={className}>
        <p className={classes.amountItemText}>0.00 USD</p>
      </div>
    </TableData>
  )
};

export default AmountItem;
