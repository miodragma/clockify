import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import * as routeConstants from './RouteConstants';

import Loader from '../components/UI/Loader/Loader';

const Tracker = React.lazy(() => import('../pages/Tracker/Tracker'));
const Clients = React.lazy(() => import('../pages/Clients/Clients'));
const Tags = React.lazy(() => import('../pages/Tags/Tags'));
const Projects = React.lazy(() => import('../pages/Projects/Projects'));
const Teams = React.lazy(() => import('../pages/Team/Team'));

const Routes = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <Switch>
        <Route path='/' exact>
          <Redirect to={`/${routeConstants.TRACKER}`}/>
        </Route>

        <Route path={`/${routeConstants.TRACKER}`} component={Tracker}/>
        <Route path={`/${routeConstants.CLIENTS}`} component={Clients}/>
        <Route path={`/${routeConstants.TAGS}`} component={Tags}/>
        <Route path={`/${routeConstants.PROJECTS}`} component={Projects}/>
        <Route path={`/${routeConstants.TEAMS}`} component={Teams}/>
      </Switch>
    </Suspense>
  )
};

export default Routes;
