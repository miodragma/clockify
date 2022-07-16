import { useCallback, useEffect } from 'react';

import TableData from '../../../../UI/TableData/TableData';
import ProjectEditActionsDropdown from '../../../../UI/ProjectEditActionsDropdown/ProjectEditActionsDropdown';

const EditItem = props => {

  const {
    className,
    project,
    editProjectAction,
    isArchiveActions,
    archiveActions,
    notArchiveActions,
    accessEditActions
  } = props;
  const { id } = project

  useEffect(() => {
  }, [id]);

  const onEditProjectActionHandler = useCallback(data => {
    editProjectAction(data)
  }, [editProjectAction])

  return (
    <TableData tdClassName={className}>
      <ProjectEditActionsDropdown
        project={project}
        onEditProjectAction={onEditProjectActionHandler}
        isArchiveActions={isArchiveActions}
        archiveActions={archiveActions}
        notArchiveActions={notArchiveActions}
        accessEditActions={accessEditActions}/>
    </TableData>
  )
};

export default EditItem;
