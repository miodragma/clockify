import { Fragment } from 'react';

import ClientsActions from './ClientsActions/ClientsActions';
import ClientsList from './ClientsList/ClientsList';

const Clients = () => {
  return (
    <Fragment>
      <ClientsActions/>
      <ClientsList/>
    </Fragment>
  )
};

export default Clients;
