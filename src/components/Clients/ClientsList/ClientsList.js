import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ClientsListItem from '../ClientsListItem/ClientsListItem';
import ClientListHeader from '../ClientListHeader/ClientListHeader';
import ClientEdit from '../../ClientEdit/ClientEdit';

import ModalWrapper from '../../UI/ModalWrapper/ModalWrapper';

import classes from './ClientsList.module.css';

import { deleteClient, updateClient } from '../store/clients-actions';

import { Form } from 'react-bootstrap';

const ClientsList = () => {

  const filterClients = useSelector(state => state.clients.filterClients);
  const {activeWorkspace} = useSelector(state => state.user.user);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editClientData, setEditClientData] = useState({});

  const [showActionModal, setShowActionModal] = useState(false);
  const [actionModalTitle, setActionModalTitle] = useState('');
  const [actionClient, setActionClient] = useState({});
  const [isActiveProject, setIsActiveProject] = useState(false);

  const {name} = actionClient;

  const dispatch = useDispatch();

  const onClickEditHandler = useCallback(client => {
    setShowEditModal(true);
    setEditClientData(client);
  }, [])

  const clients = filterClients.map(client => {
    return <ClientsListItem
      key={client.id}
      client={client}
      onClientItemAction={(action) => onClientItemActionHandler(action, client)}
      onClickEdit={() => onClickEditHandler(client)}/>
  })

  const submitEditClientHandler = useCallback(clientData => {
    const {clientId, ...dataToUpdate} = clientData;
    dispatch(updateClient({dataToUpdate, clientId, workspaceId: activeWorkspace}));
  }, [activeWorkspace, dispatch]);

  const onHideEditModalHandler = () => {
    setShowEditModal(false);
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
