import { useCallback, useEffect } from 'react';

import TableData from '../../../../UI/TableData/TableData';
import ProjectEditActionsDropdown from '../../../../Services/ProjectEditActionsDropdown/ProjectEditActionsDropdown';

const EditItem = props => {

  const {className, project, editProjectAction} = props;
  const {id} = project

  useEffect(() => {
  }, [id]);

  const onEditProjectActionHandler = useCallback(data => {
    editProjectAction(data)
  }, [editProjectAction])

  return (
    <TableData tdClassName={className} onClickTableData={console.log}>
      <ProjectEditActionsDropdown project={project} onEditProjectAction={onEditProjectActionHandler}/>
    </TableData>
  )
};

export default EditItem;
