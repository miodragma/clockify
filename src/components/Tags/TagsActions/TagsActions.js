import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Actions from '../../Services/Actions/Actions';

import { addNewTag, fetchTagsData } from '../store/tags-actions';

import { dropdownData } from './dropdownData/dropdown-data';

const TagsActions = () => {

  const [newTagVal, setNewTagVal] = useState('');
  const [isNewAdded, setIsNewAdded] = useState(false);
  const archivedVal = useRef(false);
  const nameVal = useRef('');

  const dispatch = useDispatch();
  const {activeWorkspace} = useSelector(state => state.user.user);

  const onShowByHandler = useCallback(archived => {
    archivedVal.current = archived;
    dispatch(fetchTagsData({workspaceId: activeWorkspace, archived, name: nameVal.current}))
  }, [dispatch, activeWorkspace]);

  const onSearchByNameHandler = useCallback(name => {
    nameVal.current = name;
    dispatch(fetchTagsData({workspaceId: activeWorkspace, archived: archivedVal.current, name}));
  }, [dispatch, activeWorkspace]);

  const onAddNewTagHandler = useCallback(val => {
    setNewTagVal(val.trim())
  }, []);

  const onClickAddHandler = () => {
    dispatch(addNewTag({workspaceId: activeWorkspace, name: newTagVal}));
    setIsNewAdded(true);
  };

  const inputValIsEmptyHandler = useCallback(() => {
    setIsNewAdded(false)
  }, [])

  return (
    <Actions
      addNewLabel='Add new tag'
      dropdownData={dropdownData}
      onShowBy={onShowByHandler}
      onSearchByName={onSearchByNameHandler}
      isNewAdded={isNewAdded}
      onAddNew={onAddNewTagHandler}
      inputValIsEmpty={inputValIsEmptyHandler}
      onClickAdd={onClickAddHandler}
      isNewVal={newTagVal}
    />
  )
}

export default TagsActions;
