import { Fragment, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import NameItem from './NameItem/NameItem';
import ClientItem from './ClientItem/ClientItem';
import TrackedItem from './TrackedItem/TrackedItem';
import AmountItem from './AmountItem/AmountItem';
import ProgressItem from './ProgressItem/ProgressItem';
import AccessItem from './AccessItem/AccessItem';
import FavoriteItem from './FavoriteItem/FavoriteItem';
import EditItem from './EditItem/EditItem';
import DeleteItemModal from '../../../UI/DeleteItemModal/DeleteItemModal';
import TableRow from '../../../UI/TableRow/TableRow';

import { deleteProject, updateProject } from '../../store/projects-actions';

import classes from './TableBody.module.css';

const TableBody = props => {

  const {projects, editProject} = props;

  const dispatch = useDispatch();

  const [showActionModal, setShowActionModal] = useState(false);
  const [projectData, setProjectData] = useState({});

  const onEditProjectActionHandler = actionData => {
    actionData.actionType !== 'delete' && dispatch(updateProject({
      actionType: actionData.actionType,
      dataToUpdate: { archived: !actionData.project.archived },
      workspaceId: actionData.project.workspaceId,
      id: actionData.project.id
    }))
    if (actionData.actionType === 'delete') {
      setShowActionModal(true);
      setProjectData(actionData.project)
    }
  }

  const onHideActionModalHandler = useCallback(() => {
    setShowActionModal(false);
  }, [])

  const submitActionModalHandler = useCallback(() => {
    dispatch(deleteProject(projectData))
    onHideActionModalHandler()
  }, [dispatch, onHideActionModalHandler, projectData]);

  const onEditProject = useCallback(data => {
    editProject(data);
  }, [editProject])

  const projectsData = projects.map(project => <TableRow key={project.id}>
    <NameItem className={classes.tableDataChildrenWrapper} project={project}
              onClickName={() => onEditProject({ id: project.id, tab: 'tasks' })}/>
    <ClientItem className={classes.tableDataChildrenWrapper} project={project}
                onClickClient={() => onEditProject({ id: project.id, tab: 'settings' })}/>
    <TrackedItem className={classes.tableDataChildrenWrapper} project={project}
                 onClickTracked={() => onEditProject({ id: project.id, tab: 'status' })}/>
    <AmountItem className={classes.tableDataChildrenWrapper}
                onClickAmount={() => onEditProject({ id: project.id, tab: 'status' })}/>
    <ProgressItem onClickProgress={() => onEditProject({ id: project.id, tab: 'status' })}/>
    <AccessItem className={classes.tableDataChildrenWrapper} project={project}
                onClickAccess={() => onEditProject({ id: project.id, tab: 'access' })}/>
    <FavoriteItem tableDataclassName={classes.td}/>
    <EditItem editProjectAction={onEditProjectActionHandler} project={project} className={classes.td}/>
  </TableRow>)

  const deleteMessage = `The ${projectData.name} Project will also be removed from all time
          entries it is
          assigned to. This action cannot be reversed.`

  return (
    <Fragment>
      {projectsData}
      <DeleteItemModal
        showDeleteActionModal={showActionModal}
        message={deleteMessage}
        onSubmitActionModal={submitActionModalHandler}
        onHideActionModal={onHideActionModalHandler}/>
    </Fragment>
  );
};

export default TableBody;
