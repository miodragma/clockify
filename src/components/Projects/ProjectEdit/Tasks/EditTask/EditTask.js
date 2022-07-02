import { useCallback, useState } from 'react';

import CustomDropdown from '../../../../UI/CustomDropdown/CustomDropdown';

import ellipsisIcon from '../../../../../assets/ellipsis-icon.svg';

import classes from './EditTask.module.css';

const EditTask = props => {

  const { className, task, onEditTask } = props;

  const [isOpenActions, setIsOpenActions] = useState(false);

  const onOpenItemActions = () => {
    setIsOpenActions(true)
  }

  const onCloseActions = useCallback(() => {
    setIsOpenActions(false)
  }, []);

  const onClickItemAction = (actionType) => {
    onEditTask({ actionType, task })
    setIsOpenActions(false)
  }

  let activeActions = [{ label: 'Mark as done', type: 'DONE' }];
  let doneActions = [{ label: 'Mark as active', type: 'ACTIVE' }, { label: 'Delete', type: 'delete' }];

  const mapActions = actionsData => actionsData.map((action, index) => {
    return (<p onClick={() => onClickItemAction(action.type)} key={index}>{action.label}</p>)
  });

  let actions;

  if (task.status === 'ACTIVE') {
    actions = mapActions(activeActions)
  } else {
    actions = mapActions(doneActions)
  }

  return (
    <button className={`${className ? className : ''} editItemIconWrapper`}>
      <img onClick={onOpenItemActions} className={classes.editIcon} src={ellipsisIcon} alt="edit-icon"/>
      <CustomDropdown isOpenDropdown={isOpenActions} closeDropdown={onCloseActions}>
        {actions}
      </CustomDropdown>
    </button>
  )
}

export default EditTask;
