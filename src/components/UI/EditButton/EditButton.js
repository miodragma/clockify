import { useCallback } from 'react';

import ellipsisIcon from '../../../assets/ellipsis-icon.svg';

import CustomDropdown from '../CustomDropdown/CustomDropdown';

import classes from './EditButton.module.css';

const EditButton = props => {

  const { className, onOpenItemActions, isOpenActions, onCloseActions, actions } = props;

  const onOpenItemActionsHandler = () => {
    onOpenItemActions()
  };

  const onCloseActionsHandler = useCallback(() => {
    onCloseActions();
  }, [onCloseActions]);

  return (
    <button className={`${className ? className : ''} editItemIconWrapper `}>
      <img onClick={onOpenItemActionsHandler} className={classes.editIcon} src={ellipsisIcon} alt="edit-icon"/>
      <CustomDropdown isOpenDropdown={isOpenActions} closeDropdown={onCloseActionsHandler}>
        {actions}
      </CustomDropdown>
    </button>
  )

};

export default EditButton;
