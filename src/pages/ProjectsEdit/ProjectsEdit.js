import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

import ProjectEdit from '../../components/Projects/ProjectEdit/ProjectEdit';
import MainCard from '../../components/UI/MainCard/MainCard';
import ProjectEditActionsDropdown
  from '../../components/Services/ProjectEditActionsDropdown/ProjectEditActionsDropdown';
import FavoriteButton from '../../components/Services/FavoriteButton/FavoriteButton';
import DeleteItemModal from '../../components/Services/DeleteItemModal/DeleteItemModal';

import { reviver } from '../../components/Utils/reviver';
import { mapQueryParams } from '../../components/Utils/mapQueryParams';

import { projectsActions } from '../../components/Projects/store/projects-slice';
import { deleteProject, fetchProjectById, updateProject } from '../../components/Projects/store/projects-actions';

import classes from './ProjectsEdit.module.css';

const ProjectsEditPage = () => {

  const params = useParams();
  const history = useHistory();

  const newQueryParams = useSelector(state => state.projects.newQueryParams);
  const project = useSelector(state => state.projects.project);

  const { activeWorkspace: workspaceId } = useSelector(state => state.user.user);

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

  const onNavigateToProjectsHandler = useCallback(() => {
    const currentDefaultQueryParams = JSON.parse(newQueryParams, reviver);
    history.push({ pathname: '/projects', search: mapQueryParams(currentDefaultQueryParams) })
  }, [history, newQueryParams]);

  const onEditProjectActionHandler = actionData => {
    if (actionData.actionType !== 'delete') {
      dispatch(updateProject({
        actionType: actionData.actionType,
        dataToUpdate: { archived: !actionData.project.archived },
        workspaceId,
        id: actionData.project.id
      }))
      setTimeout(() => onNavigateToProjectsHandler(), 200);
    }
    if (actionData.actionType === 'delete') {
      setShowActionModal(true);
      setProjectData(actionData.project)
    }
  }

  const onHideActionModalHandler = useCallback(() => {
    setShowActionModal(false);
  }, []);

  const submitActionModalHandler = useCallback(() => {
    dispatch(deleteProject(projectData))
    onHideActionModalHandler();
    setTimeout(() => onNavigateToProjectsHandler(), 200);
  }, [dispatch, onHideActionModalHandler, onNavigateToProjectsHandler, projectData]);

  const deleteMessage = `The ${projectData.name} Project will also be removed from all time
          entries it is
          assigned to. This action cannot be reversed.`

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
      <DeleteItemModal
        showDeleteActionModal={showActionModal}
        message={deleteMessage}
        onSubmitActionModal={submitActionModalHandler}
        onHideActionModal={onHideActionModalHandler}/>
    </MainCard>
  )

};

export default ProjectsEditPage;
