import TableData from '../../../../UI/TableData/TableData';
import FavoriteButton from '../../../../Services/FavoriteButton/FavoriteButton';

const FavoriteItem = props => {

  const {className} = props;

  return (
    <TableData tdClassName={className} onClickTableData={console.log}>
      <FavoriteButton/>
    </TableData>
  );
};

export default FavoriteItem;
