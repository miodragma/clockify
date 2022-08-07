import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import TableHeadingItem from '../../UI/TableHeadingItem/TableHeadingItem';
import TableBody from './TableBody/TableBody';
import ListHeaderRow from '../../UI/ListHeaderRow/ListHeaderRow';

import { reviver } from '../../Utils/reviver';
import { mapQueryParams } from '../../Utils/mapQueryParams';

import { theadData } from './theadData/thead-data';

import classes from './ProjectsList.module.css';

const ProjectsList = () => {

  const projects = useSelector(state => state.projects.projects);
  const newQueryParams = useSelector(state => state.projects.newQueryParams);

  const history = useHistory();
  const { pathname } = useLocation();

  const onClickSortItemHandler = useCallback(data => {
    let updateSortOrder;
    updateSortOrder = data.item.value === data.sortColumn ? data.sortOrder === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING' : data.item.defaultType
    const updateSortName = data.item.value;

    const queryParams = new Map(JSON.parse(newQueryParams, reviver));
    queryParams.set('sort-column', updateSortName);
    queryParams.set('sort-order', updateSortOrder);
    history.replace({ pathname, search: mapQueryParams(queryParams) })
  }, [history, newQueryParams, pathname]);

  const onEditProjectHandler = useCallback(data => {
    const pathName = `${pathname}/${data.id}/edit`
    history.push({pathname: pathName, hash: data.tab})
  }, [history, pathname]);

  return (
    <div>
      <ListHeaderRow>
        <p>Projects</p>
      </ListHeaderRow>
      <table className={classes.table}>
        <thead className={classes.thead}>
        <tr>
          <TableHeadingItem clickSortItem={onClickSortItemHandler} data={theadData}/>
        </tr>
        </thead>
        <tbody>
        <TableBody projects={projects} editProject={onEditProjectHandler}/>
        </tbody>
      </table>
    </div>
  )
};

export default ProjectsList;
