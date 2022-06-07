import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import TableHeadingItem from './TableHeadingItem/TableHeadingItem';
import ListHeaderRow from '../../UI/ListHeaderRow/ListHeaderRow';

import { reviver } from '../store/projects-slice';
import { mapQueryParams } from '../../Utils/mapQueryParams';

import classes from './ProjectsList.module.css';
import TableBody from './TableBody/TableBody';

const ProjectsList = () => {

  const projects = useSelector(state => state.projects.projects);
  const newQueryParams = useSelector(state => state.projects.newQueryParams);

  const history = useHistory();
  const {pathname} = useLocation();

  const onClickSortItemHandler = data => {
    let updateSortOrder;
    updateSortOrder = data.item.value === data.sortColumn ? data.sortOrder === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING' : data.item.defaultType
    const updateSortName = data.item.value;

    const queryParams = new Map(JSON.parse(newQueryParams, reviver));
    queryParams.set('sort-column', updateSortName);
    queryParams.set('sort-order', updateSortOrder);
    history.replace({pathname, search: mapQueryParams(queryParams)})
  };

  return (
    <div>
      <ListHeaderRow>
        <p>Projects</p>
      </ListHeaderRow>
      <table className={classes.table}>
        <thead className={classes.thead}>
        <tr>
          <TableHeadingItem clickSortItem={onClickSortItemHandler}/>
        </tr>
        </thead>
        <tbody>
        <TableBody projects={projects}/>
        </tbody>
      </table>
    </div>
  )
};

export default ProjectsList;
