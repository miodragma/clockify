import { Fragment, useCallback } from 'react';

import Input from '../../../UI/Input/Input';

import classes from './ClientsElement.module.css';

const ClientsElement = props => {

  const {clients, findClientName, clickClient, isClientList, findClient, createClient, isWithoutClient} = props;

  const onClickClient = client => {
    clickClient(client)
  }

  const onFindClient = useCallback(val => {
    findClient(val)
  }, [findClient])

  const onCreateClient = () => {
    createClient()
  }

  let clientsList = [];

  const clientElement = client => <p onClick={() => onClickClient(client)} key={client.id}>{client.name}</p>;

  if (findClientName) {
    clientsList = clients.filter(client => client.name.toLowerCase().includes(findClientName))
      .map(client => clientElement(client));
    isClientList(!!clientsList.length);
  } else {
    clientsList = clients.map(client => clientElement(client));
    isClientList(!!clientsList.length);
  }

  if (isWithoutClient) {
    clientsList.unshift(clientElement({id: 'without', name: 'Without client'}))
  }

  return (
    <Fragment>
      <div className={classes.clientInputBorder}>
        <Input
          currentValue={findClientName}
          className={`${classes.projectNameFormField} ${classes.clientsNameFormFiled}`}
          placeholder='Add/Find client'
          type='text'
          onChangeInputVal={onFindClient}
          autofocus={true}/>
      </div>
      {clientsList}
      {!clientsList.length && <div className={classes.clientNoFoundWrapper}>
        <span className={classes.noMatchingClient}>No matching client</span>
        <div>
          <span className={classes.pressCtrl}>Press Ctrl+Enter to quickly</span>
          <span onClick={onCreateClient} className={classes.createClientSpan}> create '{findClientName}' client</span>
        </div>
      </div>}
    </Fragment>
  )

}

export default ClientsElement;
