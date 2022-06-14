import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { existAllValuesInArray } from '../../../Utils/existAllValuesInArray';
import CustomFilterDropdown from '../../../Services/CustomFilterDropdown/CustomFilterDropdown';

import { fetchClientsData } from '../../../Clients/store/clients-actions';

import { dropdownArchiveData } from '../../../Services/dropdownArchiveData/dropdown-archive-data';

const Client = props => {

  const {className, onClientFiler} = props;

  const dispatch = useDispatch();

  const {activeWorkspace: workspaceId} = useSelector(state => state.user.user);
  const filterClients = useSelector(state => state.clients.filterProjectClients);

  const nameVal = useRef('');
  const currentDropdownLabelVal = useRef('');

  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isWithoutClient, setIsWithoutClient] = useState(false);
  const [clientListIds, setClientListIds] = useState([]);

  const isChangeArchive = useRef(false);

  const {search} = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);

  useEffect(() => {

    let clients = [];
    let containsClient = true;
    const clientStatus = currentDropdownLabelVal.current.toUpperCase() || 'ALL';
    if (isSelectAll && isWithoutClient) {
      clients = [];
      containsClient = false;
    }
    if (isSelectAll && !isWithoutClient) {
      clients = ['without'];
      containsClient = false;
    }
    if (!!nameVal.current && isSelectAll) {
      clients = [...clientListIds];
      containsClient = true;
    }
    if (!isSelectAll && clientListIds.length) {
      clients = [...clientListIds];
      isWithoutClient && clients.push('without')
    }
    if (isWithoutClient && !isSelectAll && !clientListIds.length) {
      clients = ['without']
    }
    if (!isSelectAll && !isWithoutClient && clientListIds.includes('without')) {
      clients = clients.filter(client => client !== 'without')
    }
    if (!nameVal.current && filterClients.length > clientListIds.length && isSelectAll) {
      setIsSelectAll(false);
      setIsWithoutClient(false)
    }

    const data = {
      'contains-client': containsClient,
      clients: Array.from(new Set(clients)),
      'client-status': clientStatus
    }
    onClientFiler(data)
  }, [clientListIds, currentDropdownLabelVal, filterClients.length, isSelectAll, isWithoutClient, onClientFiler])

  useEffect(() => {
    if (!isChangeArchive.current) {
      const clientsQuery = queryParams.get('clients').split(',').filter(item => item !== '');
      const clientStatus = queryParams.get('client-status');
      const containsClient = queryParams.get('contains-client');

      if (clientsQuery.length === 1 && clientsQuery.includes('without') && containsClient === 'false') {
        const currentClientsIds = filterClients.map(client => client.id);
        setClientListIds(currentClientsIds);
        setIsWithoutClient(false);
        setIsSelectAll(true)
      } else {
        setClientListIds(clientsQuery);
      }
      if (clientsQuery.length > 1 && clientsQuery.includes('without')) {
        setIsWithoutClient(true)
      }
      if (!clientsQuery.length && containsClient === 'false') {
        const currentClientsIds = filterClients.map(client => client.id);
        setClientListIds(currentClientsIds);
        setIsWithoutClient(true);
        setIsSelectAll(true)
      }
      if (!clientsQuery.length && containsClient === 'true') {
        setClientListIds([]);
        setIsWithoutClient(false);
        setIsSelectAll(false);
      }
      console.log()
      currentDropdownLabelVal.current = dropdownArchiveData.find(item => item.label.toUpperCase() === clientStatus).label
    }
    isChangeArchive.current = false;
  }, [filterClients, queryParams])

  const onSearchClientByNameHandler = useCallback(name => {
    isChangeArchive.current = true;
    const archived = dropdownArchiveData.find(data => data.label === currentDropdownLabelVal.current)?.value
    nameVal.current = name;
    dispatch(fetchClientsData({
      workspaceId,
      archived: archived !== undefined ? archived : 'empty',
      name,
      page: 'projects'
    }));
  }, [dispatch, workspaceId]);

  const onChangeArchived = useCallback(archived => {
    isChangeArchive.current = true;
    currentDropdownLabelVal.current = dropdownArchiveData.find(data => data.value.toString() === archived.toString())?.label;
    setClientListIds([]);
    setIsSelectAll(false);
    setIsWithoutClient(false);
    dispatch(fetchClientsData({workspaceId, archived, name: nameVal.current, page: 'projects'}))
  }, [dispatch, workspaceId]);

  const onChangeSelectAllHandler = useCallback(() => {
    const currentIsSelectAll = isSelectAll;
    if (!currentIsSelectAll) {
      const allClientsIds = filterClients.map(client => client.id);
      const newClientListIds = [...new Set([...clientListIds, ...allClientsIds])];
      setClientListIds(newClientListIds)
    } else {
      setClientListIds([])
    }
    setIsSelectAll(!currentIsSelectAll)
    setIsWithoutClient(!currentIsSelectAll)
  }, [clientListIds, filterClients, isSelectAll]);

  const onChangeWithoutClientHandler = useCallback(val => {
    setIsWithoutClient(val);
  }, []);

  const onClickCheckClient = useCallback(clientId => {
    const filterClientsIds = filterClients.map(client => client.id);
    let newClientListIds = [];

    const isClient = clientListIds.some(id => id === clientId);
    if (isClient) {
      newClientListIds = clientListIds.filter(id => id !== clientId);
    } else {
      newClientListIds = [...clientListIds, clientId]
    }
    const isSelectAll = existAllValuesInArray(filterClientsIds, newClientListIds);
    if (isSelectAll) {
      setIsSelectAll(true);
    } else {
      setIsSelectAll(false);
    }
    setClientListIds(newClientListIds);
  }, [clientListIds, filterClients]);

  return (
    <CustomFilterDropdown
      className={className}
      inputLabel='SearchClient'
      itemsList={filterClients}
      selectedListIds={clientListIds}
      isSelectAll={isSelectAll}
      isWithoutClient={isWithoutClient}
      isSearchByName={!!nameVal.current}
      searchByName={onSearchClientByNameHandler}
      changeActive={onChangeArchived}
      changeWithout={onChangeWithoutClientHandler}
      changeSelectAll={onChangeSelectAllHandler}
      clickCheck={onClickCheckClient}
      currentDropdownData={dropdownArchiveData}
      isUseWithoutClient={true}
      currentDropdownLabelVal={currentDropdownLabelVal.current || 'All'}
      currentInputValue={nameVal.current}
    />
  );

};

export default Client;
