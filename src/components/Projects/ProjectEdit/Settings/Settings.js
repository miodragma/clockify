import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import ProjectName from './ProjectName/ProjectName';
import ProjectClient from './ProjectClient/ProjectClient';
import ProjectColor from './ProjectColor/ProjectColor';
import ProjectBillable from './ProjectBillable/ProjectBillable';

import classes from './Settings.module.css';
import ProjectBillableRate from './ProjectBillableRate/ProjectBillableRate';

const Settings = props => {

  const project = useSelector(state => state.projects.project);

  return (
    <Fragment>
      <ProjectName className={classes.itemWrapper} project={project}/>
      <ProjectClient
        className={`${classes.itemWrapper} ${classes.settingsItemWrapper}`}
        settingsTitle={classes.settingsItemTitle}
        settingsSubTitle={classes.settingsItemSubTitle}
        project={project}/>
      <ProjectColor
        project={project}
        className={`${classes.itemWrapper} ${classes.settingsItemWrapper}`}
        settingsTitle={classes.settingsItemTitle}
        settingsSubTitle={classes.settingsItemSubTitle}/>
      <ProjectBillable
        project={project}
        className={`${classes.itemWrapper} ${classes.settingsItemWrapper}`}
        settingsTitle={classes.settingsItemTitle}
        settingsSubTitle={classes.settingsItemSubTitle}/>
      <ProjectBillableRate
        project={project}
        className={`${classes.itemWrapper} ${classes.settingsItemWrapper}`}
        settingsTitle={classes.settingsItemTitle}
        settingsSubTitle={classes.settingsItemSubTitle}/>
    </Fragment>
  )
};

export default Settings;
