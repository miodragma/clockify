import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ShortActions from '../../UI/ShortActions/ShortActions';
import MembersList from './MembersList/MembersList';

import { dropdownData } from './dropdownData/dropdown-data';

import { reviver } from '../../Utils/reviver';
import { addNewMember, fetchAllGroups, fetchAllUsers } from '../store/teams-actions';
import { mapQueryParams } from '../../Utils/mapQueryParams';

import classes from './Members.module.css';
import ModalWrapper from '../../UI/ModalWrapper/ModalWrapper';
import Input from '../../UI/Input/Input';
import CustomCheckButton from '../../UI/CustomCheckButton/CustomCheckButton';

const Members = () => {

  const dispatch = useDispatch();

  const { activeWorkspace: workspaceId } = useSelector(state => state.user.user);
  const { newUsersQueryParams, defaultGroupsQueryParams } = useSelector(state => state.teams);

  const [currentDropdownLabel, setCurrentDropdownLabel] = useState('');
  const [currentNameValue, setCurrentNameValue] = useState('');

  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [isSendEmail, setIsSendEmail] = useState(true);
  const [isDisabledAddNewMember, setIsDisabledAddNewMember] = useState(true);
  const [emailToInviteAsMember, setEmailToInviteAsMember] = useState('');

  const isLoadedQueryParams = useRef(false);

  const { search } = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);
  const history = useHistory();
  const { pathname } = useLocation();

  const isMounted = useRef(true);

  useEffect(() => {

    if (workspaceId) {
      const initParams = new Map();
      for (let [key, value] of [...queryParams]) {
        initParams.set(key, value)
        if (key === 'email' && value) {
          setCurrentNameValue(value);
        }
        if (key === 'status') {
          const label = dropdownData.find(data => data.value === value)?.label;
          setCurrentDropdownLabel(label);
        }
      }
      if (initParams.size !== 0) {
        dispatch(fetchAllUsers({ queryParams: initParams, workspaceId }));
        isLoadedQueryParams.current = true;
      }
    }
  }, [dispatch, queryParams, workspaceId])

  useEffect(() => {
    if (isMounted.current) {
      const queryParams = JSON.parse(defaultGroupsQueryParams, reviver);
      dispatch(fetchAllGroups({ queryParams, workspaceId }))
      isMounted.current = false;
    }
  }, [defaultGroupsQueryParams, dispatch, workspaceId])

  const onShowByHandler = useCallback(status => {
    const queryParams = new Map(JSON.parse(newUsersQueryParams, reviver));
    queryParams.set('status', status);
    history.replace({ pathname, hash: 'members', search: mapQueryParams(queryParams) })
  }, [history, newUsersQueryParams, pathname]);

  const onSearchByNameHandler = useCallback(name => {
    if (currentNameValue !== name) {
      setCurrentNameValue(name);
      const queryParams = new Map(JSON.parse(newUsersQueryParams, reviver));
      queryParams.set('email', name);
      queryParams.set('name', name);
      history.replace({ pathname, hash: 'members', search: mapQueryParams(queryParams) })
    }
  }, [currentNameValue, history, newUsersQueryParams, pathname]);

  const onClickAddHandler = useCallback(() => {
    setShowAddMembersModal(true);
  }, []);

  const onHideAddMembersModalHandler = useCallback(() => {
    setShowAddMembersModal(false);
    setEmailToInviteAsMember('');
  }, []);

  const onChangeInputValHandler = useCallback(email => {
    const regex = /^(([^<>()[\],;:\s@]+(\.[^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i;
    setIsDisabledAddNewMember(!regex.test(email));
    setEmailToInviteAsMember(email)
  }, []);

  const changeSendEmailHandler = useCallback(() => {
    setIsSendEmail(prevState => !prevState);
  }, []);

  const onClickSortItemHandler = useCallback(data => {
    let updateSortOrder;
    updateSortOrder = data.item.value === data.sortColumn ? data.sortOrder === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING' : data.item.defaultType
    const updateSortName = data.item.value;

    const queryParams = new Map(JSON.parse(newUsersQueryParams, reviver));
    queryParams.set('sort-column', updateSortName);
    queryParams.set('sort-order', updateSortOrder);
    history.replace({ pathname, hash: 'members', search: mapQueryParams(queryParams) })
  }, [history, newUsersQueryParams, pathname]);

  const onAddNewMemberHandler = useCallback(() => {
    dispatch(addNewMember({ workspaceId, email: emailToInviteAsMember, sendEmail: isSendEmail }))

    setShowAddMembersModal(false);
  }, [dispatch, emailToInviteAsMember, isSendEmail, workspaceId])

  return (
    isLoadedQueryParams.current &&
    <Fragment>
      <ShortActions
        currentValue={currentNameValue}
        currentDropdownLabel={currentDropdownLabel}
        inputFieldClassName={classes.inputField}
        isAddInput={false}
        searchInputPlaceholder='Search by name or email'
        dropdownData={dropdownData}
        onShowBy={onShowByHandler}
        onSearchByName={onSearchByNameHandler}
        onClickAdd={onClickAddHandler}
        isNewVal={true}
        buttonLabel='Add new member'
      />
      <MembersList onClickSort={onClickSortItemHandler} workspaceId={workspaceId}/>
      <ModalWrapper
        show={showAddMembersModal}
        onHide={onHideAddMembersModalHandler}
        title='Add member'
        isDisabledButton={isDisabledAddNewMember}
        className={'primary'}
        autoFocus={true}
        onClickSubmitButton={onAddNewMemberHandler}>
        <Input
          autofocus={true}
          placeholder='Enter email address'
          className={classes.addNewMemberInput}
          label='Email'
          type='email'
          onChangeInputVal={onChangeInputValHandler}/>
        <CustomCheckButton
          buttonWrapper={classes.checkboxButtonWrapper}
          isChecked={isSendEmail}
          label='Send an invite email'
          type='checkbox'
          changeCheckValue={changeSendEmailHandler}/>
      </ModalWrapper>
    </Fragment>
  )

};

export default Members;
