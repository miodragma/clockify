import { useHistory } from 'react-router-dom';

import Tasks from './Tasks/Tasks';
import Access from './Access/Access';
import Status from './Status/Status';
import Note from './Note/Note';
import Settings from './Settings/Settings';

import CustomTabs from '../../UI/CustomTabs/CustomTabs';

import { tabsData } from './dropdownData/tabs-data';

const ProjectEdit = () => {

  const history = useHistory();
  const hash = history.location.hash.replace('#', '');

  return (
    <CustomTabs linksData={tabsData} defaultActiveTab='tasks' hash={hash}>
      {hash === 'tasks' && <Tasks/>}
      {hash === 'access' && <Access/>}
      {hash === 'status' && <Status/>}
      {hash === 'note' && <Note/>}
      {hash === 'settings' && <Settings/>}
    </CustomTabs>

  )

};

export default ProjectEdit;
