import TableData from '../../../../UI/TableData/TableData';
import FavoriteButton from '../../../../UI/FavoriteButton/FavoriteButton';

const FavoriteItem = props => {

  const { tableDataclassName } = props;

  return (
    <TableData tdClassName={tableDataclassName}>
      <FavoriteButton/>
    </TableData>
  );
};

export default FavoriteItem;
