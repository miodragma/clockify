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
import DeleteProjectModal from '../../../Services/DeleteProjectModal/DeleteProjectModal';

import { deleteProject, updateProjectArchive } from '../../store/projects-actions';

import classes from './TableBody.module.css';

const TableBody = props => {

  const {projects, editProject} = props;

  const dispatch = useDispatch();

  const [showActionModal, setShowActionModal] = useState(false);
  const [projectData, setProjectData] = useState({});

  const onEditProjectActionHandler = actionData => {
    actionData.actionType !== 'delete' && dispatch(updateProjectArchive({
      actionType: actionData.actionType,
      data: actionData.project
    }))
    if (actionData.actionType === 'delete') {
      setShowActionModal(true);
      setProjectData(actionData.project)
    }
  }

  const onHideActionModalHandler = () => {
    setShowActionModal(false);
  }

  const submitActionModalHandler = () => {
    dispatch(deleteProject(projectData))
    onHideActionModalHandler()
  };

  const onEditProject = useCallback(data => {
    editProject(data);
  }, [editProject])

  const projectsData = projects.map(project => <tr className={classes.tr} key={project.id}>
    <NameItem project={project} onClickName={() => onEditProject({id: project.id, tab: 'tasks'})}/>
    <ClientItem project={project} onClickClient={() => onEditProject({id: project.id, tab: 'settings'})}/>
    <TrackedItem project={project} onClickTracked={() => onEditProject({id: project.id, tab: 'status'})}/>
    <AmountItem onClickAmount={() => onEditProject({id: project.id, tab: 'status'})}/>
    <ProgressItem onClickProgress={() => onEditProject({id: project.id, tab: 'status'})}/>
    <AccessItem project={project} onClickAccess={() => onEditProject({id: project.id, tab: 'access'})}/>
    <FavoriteItem className={classes.td}/>
    <EditItem editProjectAction={onEditProjectActionHandler} project={project} className={classes.td}/>
  </tr>)

  return (
    <Fragment>
      {projectsData}
      <DeleteProjectModal
        showDeleteActionModal={showActionModal}
        projectName={projectData.name}
        onSubmitActionModal={submitActionModalHandler}
        onHideActionModal={onHideActionModalHandler}/>
    </Fragment>
  );
};

export default TableBody;
