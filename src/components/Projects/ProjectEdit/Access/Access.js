import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Visibility from './Visibility/Visibility';
import AddMember from './AddMember/AddMember';
import TeamList from './TeamList/TeamList';

import { reviver } from '../../../Utils/reviver';
import { fetchAllGroups, fetchAllUsers } from '../../../Team/store/teams-actions';

import classes from './Access.module.css';

const Access = props => {

  const { users, groups } = useSelector(state => state.teams);
  const [copyOfUsers, setCopyOfUsers] = useState([]);
  const [copyOfGroups, setCopyOfGroups] = useState([]);
  const { defaultUsersQueryParams, defaultGroupsQueryParams } = useSelector(state => state.teams);
  const { memberships, workspaceId, ...project } = useSelector(state => state.projects.project);

  const dispatch = useDispatch();
  const isMounted = useRef(true);

  useEffect(() => {

    if (workspaceId && isMounted.current) {
      const currentDefaultUsersQueryParams = JSON.parse(defaultUsersQueryParams, reviver);
      currentDefaultUsersQueryParams.set('status', 'ACTIVE')
      dispatch(fetchAllUsers({ queryParams: currentDefaultUsersQueryParams, workspaceId }))

      const currentDefaultGroupsQueryParams = JSON.parse(defaultGroupsQueryParams, reviver);
      dispatch(fetchAllGroups({ queryParams: currentDefaultGroupsQueryParams, workspaceId }))
      setCopyOfUsers(users);
      setCopyOfGroups(groups);
      isMounted.current = false
    }
  }, [defaultGroupsQueryParams, defaultUsersQueryParams, dispatch, groups, users, workspaceId]);

  const addMemberGroups = [...groups].filter(group => !memberships.some(({ userId }) => userId === group.id));
  const addMemberUsers = [...users].filter(user => !memberships.some(({ userId }) => userId === user.id));
  const listGroups = [...copyOfGroups].filter(group => memberships.some(({ userId }) => userId === group.id));
  const listUsers = [...copyOfUsers].filter(user => memberships.some(({ userId }) => userId === user.id));

  return (
    <Fragment>
      <Visibility
        className={`${classes.itemWrapper}`}
        accessTitle={classes.accessItemTitle}
        accessSubTitle={classes.accessItemSubTitle}
        project={{ ...project, workspaceId }}/>
      <AddMember
        users={addMemberUsers}
        groups={addMemberGroups}
        project={{ ...project, memberships, workspaceId }}/>
      <TeamList
        project={{ ...project, memberships, workspaceId }}
        memberships={memberships}
        allUsers={copyOfUsers}
        users={listUsers}
        groups={listGroups}/>
    </Fragment>
  )
};

export default Access;
