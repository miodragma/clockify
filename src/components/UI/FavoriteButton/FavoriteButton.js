import favoriteIcon from '../../../assets/favorite-icon.svg';

import classes from './FavoriteButton.module.css';

const FavoriteButton = props => {

  const {className} = props;

  return (
    <button className={`${classes.favoriteButton} ${className ? className : ''}`} type='button'>
      <img className={classes.favoriteIcon} src={favoriteIcon} alt="favorite-icon"/>
    </button>
  )

};

export default FavoriteButton;
