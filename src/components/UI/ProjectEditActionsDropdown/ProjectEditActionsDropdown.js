import { useCallback, useState } from 'react';
import EditButton from '../EditButton/EditButton';

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

  const onOpenItemActions = useCallback(() => {
    setIsOpenActions(true)
  }, []);

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
    <EditButton
      className={className}
      isOpenActions={isOpenActions}
      onCloseActions={onCloseActions}
      actions={actions}
      onOpenItemActions={onOpenItemActions}/>
  )

}

export default ProjectEditActionsDropdown;
