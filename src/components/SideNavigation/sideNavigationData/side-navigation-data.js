import * as routeConstants from '../../../route/RouteConstants';

import timeIcon from '../../../assets/time-icon.svg';
import clientsIcon from '../../../assets/clients-icon.svg';
import tagsIcon from '../../../assets/tags-icon.svg';
import projectsIcon from '../../../assets/projects-icon.svg';
import teamIcon from '../../../assets/team-icon.svg';

export const sideNavigationData = [
  {
    type: 'link',
    label: 'Time Tracker',
    icon: timeIcon,
    path: `/${routeConstants.TRACKER}`
  },
  {
    type: 'divider',
    label: 'Manage'
  },
  {
    type: 'link',
    label: 'Projects',
    icon: projectsIcon,
    path: `/${routeConstants.PROJECTS}`
  },
  {
    type: 'link',
    label: 'Team',
    icon: teamIcon,
    path: `/${routeConstants.TEAMS}#members`
  },
  {
    type: 'link',
    label: 'Clients',
    icon: clientsIcon,
    path: `/${routeConstants.CLIENTS}`
  },
  {
    type: 'link',
    label: 'Tags',
    icon: tagsIcon,
    path: `/${routeConstants.TAGS}`
  }
];
