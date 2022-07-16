import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddFindClientsDropdown from '../../../../UI/AddFindClientsDropdown/AddFindClientsDropdown';

import { addNewClient } from '../../../../Clients/store/clients-actions';
import { updateProject } from '../../../store/projects-actions';
import { projectsActions } from '../../../store/projects-slice';

import classes from './ProjectClient.module.css';

const ProjectClient = props => {

  const { className, settingsTitle, settingsSubTitle, project } = props;
  const { id: projectId, workspaceId, client } = project;

  const dispatch = useDispatch();

  const clients = useSelector(state => state.clients.clients);

  const [clientDropdownLabel, setClientDropdownLabel] = useState('No clients');
  const [closeDropdown, setCloseDropdown] = useState(false);
  const [findClientName, setFindClientName] = useState('');

  const isClientList = useRef(false);

  const keydownHandler = useCallback(e => {
    if (e.keyCode === 13 && e.ctrlKey && findClientName && !isClientList.current) {
      dispatch(addNewClient({ workspaceId, name: findClientName }))
    }
  }, [dispatch, findClientName, workspaceId])

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler)
  }, [keydownHandler]);

  useEffect(() => {
    if (client) {
      setClientDropdownLabel(client.name);
    }
  }, [client])

  const onResetCloseDropdownHandler = useCallback(val => {
    setCloseDropdown(val);
  }, []);

  const onClickClientHandler = selectedClient => {
    if (selectedClient.id !== 'without') {
      if (selectedClient.name !== clientDropdownLabel) {
        dispatch(updateProject({
          dataToUpdate: { ...project, isPublic: project.public, clientId: selectedClient.id },
          workspaceId: workspaceId,
          id: projectId
        })).then(project => {
          const newClient = clients.find(client => client.id === project.clientId);
          dispatch(projectsActions.updateClientOnProject(newClient))
        })
        setClientDropdownLabel(selectedClient.name);
      }
    } else {
      if (selectedClient.id === 'without' && clientDropdownLabel !== 'No clients') {
        dispatch(updateProject({
          dataToUpdate: { ...project, isPublic: project.public, clientId: null },
          workspaceId: workspaceId,
          id: projectId
        })).then(project => dispatch(projectsActions.updateClientOnProject(null)))
        setClientDropdownLabel('No clients');
      }
    }
    setCloseDropdown(true);
  };

  const onIsClientListHandler = useCallback(val => {
    isClientList.current = val;
  }, []);

  const onFindClientHandler = useCallback(val => {
    setFindClientName(val)
  }, []);

  const onCreateClientHandler = useCallback(() => {
    dispatch(addNewClient({ workspaceId, name: findClientName }));
  }, [dispatch, findClientName, workspaceId]);

  return (
    <div className={`${className ? className : ''}`}>
      <p className={`${settingsTitle ? settingsTitle : ''}`}>Client</p>
      <p className={`${settingsSubTitle ? settingsSubTitle : ''}`}>Used for grouping similar projects together.</p>
      <AddFindClientsDropdown
        className={classes.settingProjectClientDropdown}
        clientDropdownLabel={clientDropdownLabel}
        closeDropdown={closeDropdown}
        resetCloseDropdown={onResetCloseDropdownHandler}
        isWithoutClient={true}
        clients={clients}
        findClientName={findClientName}
        clickClient={onClickClientHandler}
        isClientList={onIsClientListHandler}
        findClient={onFindClientHandler}
        createClient={onCreateClientHandler}
      />
    </div>
  )

};

export default ProjectClient;
