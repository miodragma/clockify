import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Members from './Members/Members';
import Groups from './Groups/Groups';
import Reminders from './Reminders/Reminders';

import CustomTabs from '../UI/CustomTabs/CustomTabs';

import { tabsData } from './tabsData/team-tabs-data';

import { reviver } from '../Utils/reviver';
import { mapQueryParams } from '../Utils/mapQueryParams';

const Team = () => {

  const [currQueryParams, setCurrQueryParams] = useState();

  const { defaultUsersQueryParams, newUsersQueryParams } = useSelector(state => state.teams);

  const history = useHistory();

  const hash = history.location.hash.replace('#', '');

  useEffect(() => {
    if (hash === 'members') {
      const currentNewQueryParams = JSON.parse(newUsersQueryParams, reviver);
      if (currentNewQueryParams.size === 0) {
        const currentDefaultQueryParams = JSON.parse(defaultUsersQueryParams, reviver);
        setCurrQueryParams(mapQueryParams(currentDefaultQueryParams))
      } else {
        setCurrQueryParams(mapQueryParams(currentNewQueryParams))
      }
    }
  }, [defaultUsersQueryParams, hash, newUsersQueryParams])

  return (
    <CustomTabs linksData={tabsData} defaultActiveTab='members' hash={hash === '' ? 'members' : hash}
                currQueryParams={currQueryParams}>
      {hash === 'members' && <Members/>}
      {hash === 'groups' && <Groups/>}
      {hash === 'reminders' && <Reminders/>}
    </CustomTabs>

  )

};

export default Team;
