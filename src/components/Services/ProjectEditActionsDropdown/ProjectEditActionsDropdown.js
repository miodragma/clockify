import { useCallback, useState } from 'react';

import CustomDropdown from '../../UI/CustomDropdown/CustomDropdown';

import ellipsisIcon from '../../../assets/ellipsis-icon.svg';

import classes from './ProjectEditActionsDropdown.module.css';

const ProjectEditActionsDropdown = props => {

  const {project, onEditProjectAction, className} = props;

  const [isOpenActions, setIsOpenActions] = useState(false);

  const onOpenItemActions = () => {
    setIsOpenActions(true)
  }

  const onCloseActions = useCallback(() => {
    setIsOpenActions(false)
  }, []);

  const onClickItemAction = (actionType) => {
    onEditProjectAction({actionType, project})
    setIsOpenActions(false)
  }

  let archiveActions = [{label: 'Set as template', type: 'template'}, {
    label: 'Restore',
    type: 'archived'
  }, {label: 'Delete', type: 'delete'}];
  let notArchiveActions = [{label: 'Set as template', type: 'template'}, {label: 'Archive', type: 'archived'}];

  const mapActions = actionsData => actionsData.map((action, index) => {
    return (<p onClick={() => onClickItemAction(action.type)} key={index}>{action.label}</p>)
  });

  let actions;

  if (project.archived) {
    actions = mapActions(archiveActions)
  } else {
    actions = mapActions(notArchiveActions)
  }

  return (
    <button className={`${classes.editItemIconWrapper} ${className ? className : ''}`}>
      <img onClick={onOpenItemActions} className={classes.editIcon} src={ellipsisIcon} alt="edit-icon"/>
      <CustomDropdown isOpenDropdown={isOpenActions} closeDropdown={onCloseActions}>
        {actions}
      </CustomDropdown>
    </button>
  )

}

export default ProjectEditActionsDropdown;
