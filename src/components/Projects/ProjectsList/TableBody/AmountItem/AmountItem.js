import { useCallback } from 'react';

import TableData from '../../../../UI/TableData/TableData';

import classes from './AmountItem.module.css';

const AmountItem = props => {

  const {onClickAmount} = props;

  const onClickAmountItemHandler = useCallback(() => {
    onClickAmount()
  }, [onClickAmount]);

  return (
    <TableData onClickTableData={onClickAmountItemHandler}>
      <p className={classes.amountItemText}>0.00 USD</p>
    </TableData>
  )
};

export default AmountItem;
