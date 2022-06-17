import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';

import NameItem from './NameItem/NameItem';
import ClientItem from './ClientItem/ClientItem';
import TrackedItem from './TrackedItem/TrackedItem';
import AmountItem from './AmountItem/AmountItem';
import ProgressItem from './ProgressItem/ProgressItem';
import AccessItem from './AccessItem/AccessItem';
import FavoriteItem from './FavoriteItem/FavoriteItem';
import EditItem from './EditItem/EditItem';

import ModalWrapper from '../../../UI/ModalWrapper/ModalWrapper';

import { deleteProject, updateProjectArchive } from '../../store/projects-actions';

import classes from './TableBody.module.css';

const TableBody = props => {

  const {projects} = props;

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

  const projectsData = projects.map(project => <tr className={classes.tr} key={project.id}>
    <NameItem project={project}/>
    <ClientItem project={project}/>
    <TrackedItem project={project}/>
    <AmountItem/>
    <ProgressItem/>
    <AccessItem project={project}/>
    <FavoriteItem className={classes.td}/>
    <EditItem editProjectAction={onEditProjectActionHandler} project={project} className={classes.td}/>
  </tr>)

  return (
    <Fragment>
      {projectsData}
      <ModalWrapper
        show={showActionModal}
        onHide={onHideActionModalHandler}
        title='Delete'
        buttonTitle='Delete'
        className={'warning'}
        onClickSubmitButton={submitActionModalHandler}>
        <div>
          <p className={classes.actionModalMessage}>The {projectData.name} Project will also be removed from all time
            entries it is
            assigned to. This action cannot be reversed.</p>
        </div>
      </ModalWrapper>
    </Fragment>
  );
};

export default TableBody;
