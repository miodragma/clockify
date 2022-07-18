import { useSelector } from 'react-redux';

import TaskList from './TaskList/TaskList';

const Status = props => {

  const project = useSelector(state => state.projects.project);
  const { users, groups } = useSelector(state => state.teams);

  return (
    <TaskList project={project} users={users} groups={groups}/>
  )
};

export default Status;
