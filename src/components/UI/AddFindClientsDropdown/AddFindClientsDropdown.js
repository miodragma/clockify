import { useCallback } from 'react';

import Input from '../Input/Input';
import CustomDropdownWrapper from '../CustomDropdownWrapper/CustomDropdownWrapper';

import classes from './AddFindClientsDropdown.module.css';

const AddFindClientsDropdown = props => {

  const {
    clients,
    className,
    findClientName,
    clickClient,
    isClientList,
    findClient,
    createClient,
    isWithoutClient,
    clientDropdownLabel,
    closeDropdown,
    resetCloseDropdown
  } = props;

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

  const clientElement = client => <p className={classes.clientName} onClick={() => onClickClient(client)}
                                     key={client.id}>{client.name}</p>;

  if (findClientName) {
    clientsList = clients.filter(client => client.name.toLowerCase().includes(findClientName))
      .map(client => clientElement(client));
    isClientList(!!clientsList.length);
  } else {
    clientsList = clients.map(client => clientElement(client));
    isClientList(!!clientsList.length);
  }

  if (isWithoutClient) {
    clientsList.unshift(clientElement({ id: 'without', name: 'Without client' }))
  }

  const onResetCloseDropdown = useCallback(val => {
    resetCloseDropdown(val)
  }, [resetCloseDropdown]);

  return (
    <CustomDropdownWrapper
      className={`createProjectCdw ${className ? className : ''}`}
      label={clientDropdownLabel}
      position={false}
      closeDropdown={closeDropdown}
      onResetCloseDropdown={onResetCloseDropdown}>
      <div className={classes.clientsList}>
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
        {(!clientsList.length || (clientsList.length === 1 && isWithoutClient)) &&
          <div className={classes.clientNoFoundWrapper}>
            <span className={classes.noMatchingClient}>No matching client</span>
            <div>
              <span className={classes.pressCtrl}>Press Ctrl+Enter to quickly</span>
              <span onClick={onCreateClient}
                    className={classes.createClientSpan}> create '{findClientName}' client</span>
            </div>
          </div>}
      </div>
    </CustomDropdownWrapper>
  )

}

export default AddFindClientsDropdown;
