import classes from './TableData.module.css';

const TableData = props => {

  const {className, tdClassName, onClickTableData} = props;

  const onClickTableDataHandler = () => {
    onClickTableData();
  };

  return (
    <td className={`${classes.td} ${tdClassName}`}>
      <div className={`${classes.tableDataItemWrapper} ${className}`} onClick={onClickTableDataHandler}>
        {props.children}
      </div>
    </td>
  );
};

export default TableData;
