import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import * as routeConstants from './RouteConstants';

const Tracker = React.lazy(() => import('../pages/Tracker/Tracker'));
const Clients = React.lazy(() => import('../pages/Clients/Clients'));

const Routes = () => {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <Switch>
        <Route path='/' exact>
          <Redirect to={`/${routeConstants.TRACKER}`}/>
        </Route>

        <Route path={`/${routeConstants.TRACKER}`} component={Tracker}/>
        <Route path={`/${routeConstants.CLIENTS}`} component={Clients}/>
      </Switch>
    </Suspense>
  )
};

export default Routes;
