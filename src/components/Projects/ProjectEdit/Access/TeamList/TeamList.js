import { Fragment, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import ListHeaderRow from '../../../../UI/ListHeaderRow/ListHeaderRow';
import CustomTableHeadingItem from '../../../../UI/CustomTableHeadingItem/CustomTableHeadingItem';
import TableRow from '../../../../UI/TableRow/TableRow';
import TableData from '../../../../UI/TableData/TableData';
import ReadonlyInputWithSetButton from '../../../../UI/ReadonlyInputWithSetButton/ReadonlyInputWithSetButton';
import BillableRateModal from '../../../../UI/BillableRateModal/BillableRateModal';
import EditItem from '../../../ProjectsList/TableBody/EditItem/EditItem';

import { teamListGroupsData, teamListUsersData } from './teamListData/team-list-data';
import { accessEditActions } from '../../../../Services/dropdownEditData/dropdown-edit-data';

import { updateProject } from '../../../store/projects-actions';

import classes from './TeamList.module.css';
import DeleteItemModal from '../../../../UI/DeleteItemModal/DeleteItemModal';
import { billableRateValue } from '../../../../Utils/billableRateValue';

const TeamList = props => {

  const { users, groups, allUsers, memberships, project } = props;
  const { id: projectId, workspaceId } = project;

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [rateVal, setRateVal] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);

  const [amountInModal, setAmountInModal] = useState('');
  const [userIdToUpdate, setUserIdToUpdate] = useState('');
  const [userInfoFullName, setUserInfoFullName] = useState('');

  const [showActionModal, setShowActionModal] = useState(false);
  const [userIdToRemove, setUserIdToRemove] = useState('');
  const [userRemoveFullName, setUserRemoveFullName] = useState('');

  //All users need for name on testers groups
  // console.log('ALL USERS: ', allUsers)

  const onClickBillableRate = useCallback((amount, userId, userFullName) => {
    setShowModal(true);
    setAmountInModal(amount);
    setUserIdToUpdate(userId);
    setUserInfoFullName(userFullName);
  }, []);

  const onHideModalHandler = useCallback(() => {
    setShowModal(false)
  }, []);

  const onEditAccessMemberHandler = useCallback((userId, userFullName) => {
    setShowActionModal(true);
    setUserIdToRemove(userId);
    setUserRemoveFullName(userFullName);
  }, [])

  const onChangeRateValueHandler = useCallback(val => {

    if (amountInModal / 100 !== +val) {
      setIsDisabled(false)
      setRateVal(val);
    } else {
      setIsDisabled(true)
    }
  }, [amountInModal]);

  const onSubmitBillableRateHandler = useCallback(() => {
    let val = billableRateValue(rateVal)
    dispatch(updateProject({
      actionType: 'billableRate',
      dataToUpdate: { amount: +val },
      userId: userIdToUpdate,
      workspaceId: workspaceId,
      id: projectId
    }))
    setShowModal(false)
  }, [dispatch, projectId, rateVal, userIdToUpdate, workspaceId]);

  const submitActionModalHandler = useCallback(() => {
    /*TODO this request should be delete ( when the clockify add to API ), now this is a workaround*/
    const membershipsIds = memberships.map(membership => ({ userId: membership.userId })).filter(userId => userId.userId !== userIdToRemove);
    dispatch(updateProject({
      actionType: 'memberships',
      dataToUpdate: { memberships: membershipsIds },
      workspaceId,
      id: projectId
    }))
    setShowActionModal(false);
  }, [dispatch, memberships, projectId, userIdToRemove, workspaceId]);

  const onHideActionModalHandler = useCallback(() => {
    setShowActionModal(false);
  }, []);

  let usersContent = users.map(user => {

    const { hourlyRate } = memberships.find(membership => membership.userId === user.id);
    const amount = hourlyRate ? hourlyRate.amount : 0;

    return (
      <TableRow key={user.id} className={classes.teamListTableRow}>
        <TableData className={`${classes.teamListTableData} ${classes.teamListTableDataNameColumn}`}>
          <p>{user.name}</p>
        </TableData>
        <TableData className={classes.teamListTableData}>
          <ReadonlyInputWithSetButton
            className={classes.billableRateWrapper}
            onClickSetChange={() => onClickBillableRate(amount, user.id, user.name)}
            amount={amount}/>
        </TableData>
        <TableData className={classes.teamListTableData}>
          {/*TODO replace it static owner with a correct property*/}
          <p>Owner</p>
        </TableData>
        <EditItem
          className={classes.teamListTableDataEditColumn}
          project={project}
          isArchiveActions={false}
          editProjectAction={() => onEditAccessMemberHandler(user.id, user.name)}
          accessEditActions={accessEditActions}/>
      </TableRow>
    )
  });

  let groupsContent = groups.map(group => {

    const membersOfGroup = group.userIds.map(userId => allUsers.find(user => user.id === userId)?.name);
    return (
      <TableRow key={group.id} className={classes.teamListTableRow}>
        <TableData className={`${classes.teamListTableData} ${classes.teamListTableDataNameColumn}`}>
          <p>{group.name} </p>{membersOfGroup &&
          <span className={classes.groupNameColumnMembers}> - {membersOfGroup.join(', ')}</span>}
        </TableData>
        <EditItem
          className={classes.teamListTableDataEditColumn}
          project={project}
          isArchiveActions={false}
          editProjectAction={() => onEditAccessMemberHandler(group.id, group.name)}
          accessEditActions={accessEditActions}/>
      </TableRow>
    )
  });

  const deleteMessage = `Once removed, ${userRemoveFullName} will no longer have access to this project and won’t be able to track time for it any more.`

  return (
    (users.length > 0 || groups.length > 0) && <Fragment>
      {
        users.length > 0 && <div className={classes.teamListWrapper}>
          <ListHeaderRow>
            <p>Users</p>
          </ListHeaderRow>
          <table className='customTable'>
            <thead className='customThead'>
            <tr>
              <CustomTableHeadingItem data={teamListUsersData}/>
            </tr>
            </thead>
            <tbody>
            {usersContent}
            </tbody>
          </table>
        </div>
      }

      {
        groups.length > 0 && <div className={classes.teamListWrapper}>
          <ListHeaderRow>
            <p>Groups</p>
          </ListHeaderRow>
          <table className='customTable'>
            <thead className='customThead'>
            <tr>
              <CustomTableHeadingItem data={teamListGroupsData}/>
            </tr>
            </thead>
            <tbody>
            {groupsContent}
            </tbody>
          </table>
        </div>
      }
      <BillableRateModal
        showModal={showModal}
        onHideModal={onHideModalHandler}
        amount={amountInModal}
        isDisabled={isDisabled}
        onSubmitFormBillableRate={onSubmitBillableRateHandler}
        infoMessage={`We'll apply this rate to all entries made by ${userInfoFullName} on this project.`}
        onChangeRateValue={onChangeRateValueHandler}
      />
      <DeleteItemModal
        title='Remove'
        buttonTitle='Remove'
        showDeleteActionModal={showActionModal}
        message={deleteMessage}
        onSubmitActionModal={submitActionModalHandler}
        onHideActionModal={onHideActionModalHandler}/>
    </Fragment>
  )
};

export default TeamList;

