import { useSelector } from 'react-redux';

import ClientsListItem from '../ClientsListItem/ClientsListItem';
import ClientListHeader from '../ClientListHeader/ClientListHeader';

import classes from './ClientsList.module.css';
import { useCallback } from 'react';

const ClientsList = () => {

  const filterClients = useSelector(state => state.clients.filterClients);

  const onClickEditHandler = useCallback(() => {

  }, [])

  const clients = filterClients.map(client => {
    return <ClientsListItem
      key={client.id}
      client={client}
      clientId={client.id}
      onClickEdit={onClickEditHandler}/>
  })

  return (
    <section className={classes.section}>
      <ClientListHeader/>
      {clients}
    </section>
  )
};

export default ClientsList;
