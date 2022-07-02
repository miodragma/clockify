import classes from './TableData.module.css';

const TableData = props => {

  const { className, tdClassName } = props;

  return (
    <td className={`${classes.td} ${tdClassName ? tdClassName : ''}`}>
      <div className={`${classes.tableDataItemWrapper} ${className ? className : ''}`}>
        {props.children}
      </div>
    </td>
  );
};

export default TableData;
