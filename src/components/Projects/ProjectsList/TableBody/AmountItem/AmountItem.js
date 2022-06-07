import TableData from '../../../../UI/TableData/TableData';

import classes from './AmountItem.module.css';

const AmountItem = props => {

  return (
    <TableData>
      <p className={classes.amountItemText}>0.00 USD</p>
    </TableData>
  )
};

export default AmountItem;
