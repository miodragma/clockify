import { Fragment } from 'react';

import ProjectFilter from './ProjectsFilter/ProjectFilter';
import ProjectsList from './ProjectsList/ProjectsList';

const Projects = () => {
  return (
    <Fragment>
      <ProjectFilter/>
      <ProjectsList/>
    </Fragment>
  )
};

export default Projects;
