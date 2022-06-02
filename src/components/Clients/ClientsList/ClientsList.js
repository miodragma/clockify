import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';

import ClientListHeader from '../ClientListHeader/ClientListHeader';
import ClientEdit from '../ClientEdit/ClientEdit';
import ListItem from '../../Utils/ListItem/ListItem';
import ModalWrapper from '../../UI/ModalWrapper/ModalWrapper';

import { deleteClient, updateClient } from '../store/clients-actions';

import classes from './ClientsList.module.css';

const initialState = {
  name: '',
  address: '',
  note: '',
  id: ''
}

const ClientsList = () => {

  const filterClients = useSelector(state => state.clients.filterClients);
  const {activeWorkspace} = useSelector(state => state.user.user);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editClientData, setEditClientData] = useState(initialState);

  const [showActionModal, setShowActionModal] = useState(false);
  const [actionModalTitle, setActionModalTitle] = useState('');
  const [actionClient, setActionClient] = useState({});
  const [isActiveProject, setIsActiveProject] = useState(false);

  const {name} = actionClient;

  const dispatch = useDispatch();

  const onClickEditHandler = useCallback(client => {
    const newClient = {...client};
    Object.keys(newClient).forEach(
      (key) => (newClient[key] === null) ? newClient[key] = '' : newClient[key]
    );
    setEditClientData(newClient);
    setShowEditModal(true);
  }, [])

  const clients = filterClients.map(client => {
    return <ListItem
      type='client'
      key={client.id}
      data={client}
      onItemAction={(action) => onClientItemActionHandler(action, client)}
      onClickEdit={() => onClickEditHandler(client)}/>
  })

  const submitEditClientHandler = useCallback(clientData => {
    const {clientId, ...dataToUpdate} = clientData;
    dispatch(updateClient({dataToUpdate, clientId, workspaceId: activeWorkspace}));
  }, [activeWorkspace, dispatch]);

  const onHideEditModalHandler = () => {
    setShowEditModal(false);
    setEditClientData(initialState);
  };

  const onClientItemActionHandler = useCallback((action, client) => {
    setIsActiveProject(false);
    setActionModalTitle(action)
    setActionClient(client);
    setShowActionModal(true)
  }, [])

  const submitActionModalHandler = () => {
    const {id: clientId, workspaceId, ...clientData} = actionClient;
    if (actionModalTitle === 'Archive' || actionModalTitle === 'Restore') {
      const dataToUpdate = {...clientData, archived: actionModalTitle === 'Archive'};
      dispatch(updateClient({dataToUpdate, clientId, workspaceId, isActiveProject}));
    } else {
      dispatch(deleteClient({clientId, workspaceId}))
    }
    onHideActionModalHandler()
  };

  const onHideActionModalHandler = () => {
    setShowActionModal(false);
  }

  const onCheckActiveProjectsHandler = e => {
    setIsActiveProject(!isActiveProject)
  }

  let actionBody;
  if (actionModalTitle && showActionModal && name) {
    const actionsBody = {
      archive: <div>
        <p className={classes.actionModalParagraph}>Are you sure you want to archive {name}?</p>
        <div onClick={onCheckActiveProjectsHandler}>
          <Form.Check
            readOnly
            className={classes.checkbox}
            checked={isActiveProject}
            type='checkbox'
            label='Also archive all project assigned to this client'
          />
        </div>
      </div>,
      restore: <p className={classes.actionModalParagraph}>Are you sure you want to restore {name}?</p>,
      delete: <div>
        <p className={classes.actionModalParagraph}>Are you sure you want to delete {name}?</p>
        <p className={classes.actionModalMessage}>The {name} client will also be removed from projects it is
          assigned to. This action cannot be reversed.</p>
      </div>
    }
    actionBody = (actionsBody[actionModalTitle.toLowerCase()])
  }

  return (
    <section className={classes.section}>
      <ClientListHeader/>
      {clients}
      <ClientEdit
        onHide={onHideEditModalHandler}
        show={showEditModal}
        client={editClientData}
        submitEditClient={submitEditClientHandler}/>
      <ModalWrapper
        show={showActionModal}
        onHide={onHideActionModalHandler}
        title={actionModalTitle}
        buttonTitle={actionModalTitle}
        className={'warning'}
        onClickSubmitButton={submitActionModalHandler}>
        {actionBody}
      </ModalWrapper>
    </section>
  )
};

export default ClientsList;
