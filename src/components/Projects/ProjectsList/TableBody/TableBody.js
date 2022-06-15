import { useDispatch } from 'react-redux';

import NameItem from './NameItem/NameItem';
import ClientItem from './ClientItem/ClientItem';
import TrackedItem from './TrackedItem/TrackedItem';
import AmountItem from './AmountItem/AmountItem';
import ProgressItem from './ProgressItem/ProgressItem';
import AccessItem from './AccessItem/AccessItem';
import FavoriteItem from './FavoriteItem/FavoriteItem';
import EditItem from './EditItem/EditItem';

import classes from './TableBody.module.css';
import { deleteProject, updateProjectArchive } from '../../store/projects-actions';

const TableBody = props => {

  const {projects} = props;

  const dispatch = useDispatch();

  const onEditProjectActionHandler = actionData => {
    actionData.actionType !== 'delete' && dispatch(updateProjectArchive({
      actionType: actionData.actionType,
      data: actionData.project
    }))
    actionData.actionType === 'delete' && dispatch(deleteProject(actionData.project))
  }

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

  return (projectsData);
};

export default TableBody;
