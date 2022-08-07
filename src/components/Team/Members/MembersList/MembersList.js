import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RoleModal from './RoleModal/RoleModal';
import GroupDropdown from './GroupDropdown/GroupDropdown';
import EditProfileModal from './EditProfileModal/EditProfileModal';
import EditButton from '../../../UI/EditButton/EditButton';
import ListHeaderRow from '../../../UI/ListHeaderRow/ListHeaderRow';
import TableHeadingItem from '../../../UI/TableHeadingItem/TableHeadingItem';
import TableRow from '../../../UI/TableRow/TableRow';
import TableData from '../../../UI/TableData/TableData';
import ReadonlyInputWithSetButton from '../../../UI/ReadonlyInputWithSetButton/ReadonlyInputWithSetButton';
import BillableRateModal from '../../../UI/BillableRateModal/BillableRateModal';

import { billableRateValue } from '../../../Utils/billableRateValue';
import { updateUserBillableRate } from '../../store/teams-actions';

import { theadData } from './tableHeadingData/table-heading-data';

import classes from './MembersList.module.css';

const MembersList = props => {

  const { onClickSort, workspaceId } = props;

  const dispatch = useDispatch();

  /* Start Role modal */
  const [showRoleModal, setShowRoleModal] = useState(false);

  /* Start Billable modal */
  const [showModal, setShowModal] = useState(false);
  const [amountInModal, setAmountInModal] = useState('');
  const [userIdToUpdate, setUserIdToUpdate] = useState('');
  const [userInfoFullName, setUserInfoFullName] = useState('');

  const [rateVal, setRateVal] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);

  const [isOpenActions, setIsOpenActions] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  const users = useSelector(state => state.teams.users);
  const { user: currentUser } = useSelector(state => state.user)

  const [userEditProfile, setUserEditProfile] = useState(null);

  const onOpenItemActions = useCallback((user) => {
    setUserEditProfile(user);
    setIsOpenActions(true)
  }, []);

  const onCloseActions = useCallback(() => {
    setIsOpenActions(false)
  }, []);

  const onClickSortItemHandler = useCallback(val => {
    onClickSort(val)
  }, [onClickSort]);

  const onClickBillableRate = useCallback((amount, userId, userFullName) => {
    setShowModal(true);
    setAmountInModal(amount);
    setUserIdToUpdate(userId);
    setUserInfoFullName(userFullName);
  }, []);

  const onClickRole = useCallback(userFullName => {
    setShowRoleModal(true);
    setUserInfoFullName(userFullName);
  }, []);

  const onHideModalHandler = useCallback(() => {
    setShowModal(false);
    setShowRoleModal(false);
    setShowEditProfileModal(false);
    setUserEditProfile(null)
  }, []);

  const onChangeRateValueHandler = useCallback(val => {
    if (amountInModal / 100 !== +val) {
      setIsDisabled(false)
      setRateVal(val);
    } else {
      setIsDisabled(true)
    }
  }, [amountInModal]);

  const onSubmitBillableRateHandler = useCallback(() => {
    let val = billableRateValue(rateVal);
    dispatch(updateUserBillableRate({
      amount: +val,
      userId: userIdToUpdate,
      workspaceId: workspaceId
    }))
    setShowModal(false)
  }, [dispatch, rateVal, userIdToUpdate, workspaceId]);

  const onClickItemAction = () => {
    setShowEditProfileModal(true);
    setIsOpenActions(false)
  }

  let teamListContent;

  if (users.length > 0) {
    teamListContent = users.map(user => {
      const editActions = <p onClick={onClickItemAction}>Edit profile</p>

      const { hourlyRate } = user.memberships.find(membership => membership.userId === user.id);
      const amount = hourlyRate ? hourlyRate.amount : 0;

      return <TableRow key={user.id}>
        <TableData tdClassName={classes.tableDataName}>
          <p className={classes.tableDataParagraph}>{user.name} {currentUser.id === user.id ? '(you)' : ''}</p>
        </TableData>
        <TableData>
          <p className={classes.tableDataParagraph}>{user.email}</p>
        </TableData>
        <TableData className={classes.teamListTableData}>
          <ReadonlyInputWithSetButton
            className={classes.billableRateWrapper}
            onClickSetChange={() => onClickBillableRate(amount, user.id, user.name)}
            amount={amount}/>
        </TableData>
        <TableData className={classes.teamListTableData}>
          <p className={classes.owner} onClick={() => onClickRole(user.name)}>Owner</p>
        </TableData>
        <TableData className={classes.teamListTableData}>
          <GroupDropdown user={user}/>
        </TableData>
        <TableData tdClassName={classes.editTdClassName} className={classes.teamListTableData}>
          <EditButton
            isOpenActions={isOpenActions && userEditProfile.id === user.id}
            onCloseActions={onCloseActions}
            actions={editActions}
            onOpenItemActions={() => onOpenItemActions(user)}/>
        </TableData>
      </TableRow>
    })
  }

  return (
    <div className={classes.membersListWrapper}>
      <ListHeaderRow>
        <p>Members</p>
      </ListHeaderRow>
      <table className='customTable'>
        <thead className='customThead'>
        <tr>
          <TableHeadingItem clickSortItem={onClickSortItemHandler} data={theadData}/>
        </tr>
        </thead>
        <tbody>
        {teamListContent}
        </tbody>
      </table>
      <BillableRateModal
        showModal={showModal}
        onHideModal={onHideModalHandler}
        amount={amountInModal}
        isDisabled={isDisabled}
        onSubmitFormBillableRate={onSubmitBillableRateHandler}
        infoMessage={`We'll apply this rate to all entries made by ${userInfoFullName}, except on projects that have their own rate.`}
        onChangeRateValue={onChangeRateValueHandler}
      />
      <RoleModal showRoleModal={showRoleModal} onHideRoleModal={onHideModalHandler}
                 userInfoFullName={userInfoFullName}/>
      <EditProfileModal
        user={userEditProfile}
        showEditProfileModal={showEditProfileModal}
        onHideRoleModal={onHideModalHandler}/>
    </div>
  )

};

export default MembersList;
