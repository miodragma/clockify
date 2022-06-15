import { useCallback, useEffect, useState } from 'react';

import TableData from '../../../../UI/TableData/TableData';
import CustomDropdown from '../../../../UI/CustomDropdown/CustomDropdown';

import ellipsisIcon from '../../../../../assets/ellipsis-icon.svg';

import classes from './EditItem.module.css';

const EditItem = props => {

  const {className, project, editProjectAction} = props;
  const {id} = project

  const [isOpenActions, setIsOpenActions] = useState(false);

  useEffect(() => {
  }, [id])

  const onOpenItemActions = () => {
    setIsOpenActions(true)
  }

  const onCloseActions = useCallback(() => {
    setIsOpenActions(false)
  }, [])

  const onClickItemAction = (actionType) => {
    editProjectAction({actionType, project})
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
    <TableData tdClassName={className}>
      <div className={classes.editItemIconWrapper}>
        <img onClick={onOpenItemActions} className={classes.editIcon} src={ellipsisIcon} alt="edit-icon"/>
        <CustomDropdown isOpenDropdown={isOpenActions} closeDropdown={onCloseActions}>
          {actions}
        </CustomDropdown>
      </div>
    </TableData>
  )
};

export default EditItem;
