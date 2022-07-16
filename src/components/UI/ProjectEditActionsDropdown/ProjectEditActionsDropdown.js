import { useCallback, useState } from 'react';

import CustomDropdown from '../CustomDropdown/CustomDropdown';

import ellipsisIcon from '../../../assets/ellipsis-icon.svg';

import classes from './ProjectEditActionsDropdown.module.css';

const ProjectEditActionsDropdown = props => {

  const {
    project,
    onEditProjectAction,
    className,
    isArchiveActions = true,
    archiveActions,
    notArchiveActions,
    accessEditActions
  } = props;

  const [isOpenActions, setIsOpenActions] = useState(false);

  const onOpenItemActions = () => {
    setIsOpenActions(true)
  }

  const onCloseActions = useCallback(() => {
    setIsOpenActions(false)
  }, []);

  const onClickItemAction = (actionType) => {
    onEditProjectAction({ actionType, project })
    setIsOpenActions(false)
  }

  const mapActions = actionsData => actionsData.map((action, index) => {
    return (<p onClick={() => onClickItemAction(action.type)} key={index}>{action.label}</p>)
  });

  let actions;

  if (isArchiveActions) {
    if (project.archived) {
      actions = mapActions(archiveActions)
    } else {
      actions = mapActions(notArchiveActions)
    }
  } else {
    actions = mapActions(accessEditActions)
  }

  return (
    <button className={`${className ? className : ''} editItemIconWrapper `}>
      <img onClick={onOpenItemActions} className={classes.editIcon} src={ellipsisIcon} alt="edit-icon"/>
      <CustomDropdown isOpenDropdown={isOpenActions} closeDropdown={onCloseActions}>
        {actions}
      </CustomDropdown>
    </button>
  )

}

export default ProjectEditActionsDropdown;
