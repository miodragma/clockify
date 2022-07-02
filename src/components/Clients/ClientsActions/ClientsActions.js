import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Actions from '../../Services/Actions/Actions';

import { dropdownData } from './dropdownData/dropdown-data';
import { addNewClient, fetchClientsData } from '../store/clients-actions';

const ClientsActions = () => {

  const [newClientVal, setNewClientVal] = useState('');
  const [isNewAdded, setIsNewAdded] = useState(false);
  const archivedVal = useRef(false);
  const nameVal = useRef('');

  const dispatch = useDispatch();
  const {activeWorkspace} = useSelector(state => state.user.user);

  const onShowByHandler = useCallback(archived => {
    archivedVal.current = archived;
    dispatch(fetchClientsData({workspaceId: activeWorkspace, archived, name: nameVal.current}))
  }, [dispatch, activeWorkspace]);

  const onSearchByNameHandler = useCallback(name => {
    nameVal.current = name;
    dispatch(fetchClientsData({workspaceId: activeWorkspace, archived: archivedVal.current, name}));
  }, [dispatch, activeWorkspace]);

  const onAddNewClientHandler = useCallback(val => {
    setNewClientVal(val.trim())
  }, []);

  const onClickAddHandler = () => {
    dispatch(addNewClient({workspaceId: activeWorkspace, name: newClientVal}));
    setIsNewAdded(true);
  };

  const inputValIsEmptyHandler = useCallback(() => {
    setIsNewAdded(false)
  }, [])

  return (
    <Actions
      addNewLabel='Add new client'
      dropdownData={dropdownData}
      onShowBy={onShowByHandler}
      onSearchByName={onSearchByNameHandler}
      isNewAdded={isNewAdded}
      onAddNew={onAddNewClientHandler}
      inputValIsEmpty={inputValIsEmptyHandler}
      onClickAdd={onClickAddHandler}
      isNewVal={newClientVal}
    />
  )
};

export default ClientsActions;
