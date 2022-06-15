import TableData from '../../../../UI/TableData/TableData';

import favoriteIcon from '../../../../../assets/favorite-icon.svg';

import classes from './FavoriteItem.module.css';

const FavoriteItem = props => {

  const {className} = props;

  return (
    <TableData tdClassName={className}>
      <img className={classes.favoriteIcon} src={favoriteIcon} alt="favorite-icon"/>
    </TableData>
  );
};

export default FavoriteItem;
