import classes from './TableRow.module.css';

const TableRow = props => {

  const { className } = props;

  return (
    <tr className={`${classes.tr} ${className ? className : ''}`}>
      {props.children}
    </tr>
  )

};

export default TableRow;
