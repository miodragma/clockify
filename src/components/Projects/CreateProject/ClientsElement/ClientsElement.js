import { Fragment, useCallback } from 'react';

import Input from '../../../UI/Input/Input';

import classes from './ClientsElement.module.css';

const ClientsElement = props => {

  const {clients, findClientName, clickClient, isClientList, findClient, createClient} = props;

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

  if (findClientName) {
    clientsList = clients.filter(client => client.name.toLowerCase().includes(findClientName))
      .map(client => <p onClick={() => onClickClient(client)} key={client.id}>{client.name}</p>);
    isClientList(!!clientsList.length);
  } else {
    clientsList = clients.map(client => <p onClick={() => onClickClient(client)}
                                           key={client.id}>{client.name}</p>);
    isClientList(!!clientsList.length);
  }

  return (
    <Fragment>
      <div className={classes.clientInputBorder}>
        <Input
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
