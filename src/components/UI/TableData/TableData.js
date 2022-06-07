import classes from './TableData.module.css';

const TableData = props => {

  const {className, tdClassName} = props;

  return (
    <td className={`${classes.td} ${tdClassName}`}>
      <div className={`${classes.tableDataItemWrapper} ${className}`}>
        {props.children}
      </div>
    </td>
  );
};

export default TableData;
