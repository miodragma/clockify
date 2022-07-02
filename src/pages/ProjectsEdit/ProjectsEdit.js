import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

import ProjectEdit from '../../components/Projects/ProjectEdit/ProjectEdit';
import MainCard from '../../components/UI/MainCard/MainCard';
import ProjectEditActionsDropdown
  from '../../components/Services/ProjectEditActionsDropdown/ProjectEditActionsDropdown';
import FavoriteButton from '../../components/Services/FavoriteButton/FavoriteButton';
import DeleteProjectModal from '../../components/Services/DeleteProjectModal/DeleteProjectModal';

import { reviver } from '../../components/Utils/reviver';
import { mapQueryParams } from '../../components/Utils/mapQueryParams';

import { projectsActions } from '../../components/Projects/store/projects-slice';
import {
  deleteProject,
  fetchProjectById,
  updateProjectArchive
} from '../../components/Projects/store/projects-actions';

import classes from './ProjectsEdit.module.css';


const ProjectsEditPage = () => {

  const params = useParams();
  const history = useHistory();

  const newQueryParams = useSelector(state => state.projects.newQueryParams);
  const project = useSelector(state => state.projects.project);

  const {activeWorkspace: workspaceId} = useSelector(state => state.user.user);

  const dispatch = useDispatch();

  const [showActionModal, setShowActionModal] = useState(false);
  const [projectData, setProjectData] = useState({});

  const projectId = params.id;

  useEffect(() => {
    if (workspaceId) {
      dispatch(fetchProjectById({ workspaceId, projectId }))
    }

    return () => {
      dispatch(projectsActions.setProject({}));
    }
  }, [dispatch, projectId, workspaceId])

  const onNavigateToProjectsHandler = () => {
    const currentDefaultQueryParams = JSON.parse(newQueryParams, reviver);
    history.push({pathname: '/projects', search: mapQueryParams(currentDefaultQueryParams)})
  };

  const onEditProjectActionHandler = actionData => {
    if (actionData.actionType !== 'delete') {
      dispatch(updateProjectArchive({
        actionType: actionData.actionType,
        data: actionData.project
      }))
      setTimeout(() => onNavigateToProjectsHandler(), 200);
    }
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
    onHideActionModalHandler();
    setTimeout(() => onNavigateToProjectsHandler(), 200);
  };

  return (
    <MainCard>
      <Row className='pageTitleRow'>
        <Col>
          <p className={classes.projectsButton} onClick={onNavigateToProjectsHandler}>Projects</p>
          {project.id && <div className={classes.headerWrapper}>
            <div>
              <h1 className='pageTitle'>{project.name}</h1>
              <p className={classes.projectClientName}>{project.client?.name}</p>
            </div>
            <div className={classes.headerWrapperButtons}>
              <FavoriteButton className={classes.favoriteButton}/>
              <ProjectEditActionsDropdown className={classes.actionsButton} project={project}
                                          onEditProjectAction={onEditProjectActionHandler}/>
            </div>
          </div>}
        </Col>
      </Row>
      {project.id && projectId && <ProjectEdit projectId={projectId}/>}
      <DeleteProjectModal
        showDeleteActionModal={showActionModal}
        projectName={projectData.name}
        onSubmitActionModal={submitActionModalHandler}
        onHideActionModal={onHideActionModalHandler}/>
    </MainCard>
  )

};

export default ProjectsEditPage;