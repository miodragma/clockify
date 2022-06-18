import { Fragment, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { Col, Row } from 'react-bootstrap';

import MainCard from '../../components/UI/MainCard/MainCard';
import Projects from '../../components/Projects';
import CreateProject from '../../components/Projects/CreateProject/CreateProject';

import { reviver } from '../../components/Utils/reviver';

import { fetchProjectsData } from '../../components/Projects/store/projects-actions';
import { fetchClientsData } from '../../components/Clients/store/clients-actions';
import { fetchAllGroups, fetchAllUsers } from '../../components/Team/store/teams-actions';
import { mapQueryParams } from '../../components/Utils/mapQueryParams';

const ProjectsPage = () => {

  const {activeWorkspace: workspaceId} = useSelector(state => state.user.user);
  const defaultQueryParams = useSelector(state => state.projects.defaultQueryParams);
  const {defaultUsersQueryParams, defaultGroupsQueryParams} = useSelector(state => state.teams);

  const {search} = useLocation();

  const isMounted = useRef(true);

  const queryParams = useMemo(() => new URLSearchParams(search), [search]);
  const clientStatus = queryParams.get('client-status');

  const dispatch = useDispatch();

  const history = useHistory();
  const {pathname} = useLocation();

  const isLoadParams = useRef(false);

  useEffect(() => {

    if (workspaceId) {
      const initParams = new Map();
      for (let [key, value] of [...queryParams]) {
        initParams.set(key, value)
      }
      if (initParams.size === 0) {
        const currentDefaultQueryParams = JSON.parse(defaultQueryParams, reviver);
        history.replace({pathname, search: mapQueryParams(currentDefaultQueryParams)})
        setTimeout(() => isLoadParams.current = true, 200)
      } else {
        dispatch(fetchProjectsData({queryParams: initParams, workspaceId}))
        isLoadParams.current = true;
      }
    }

  }, [dispatch, queryParams, defaultQueryParams, workspaceId, history, pathname])

  useEffect(() => {
    if (isMounted.current) {
      if (workspaceId) {

        dispatch(fetchClientsData({workspaceId, archived: false, page: 'projects'}));

        const currentDefaultUsersQueryParams = JSON.parse(defaultUsersQueryParams, reviver);
        dispatch(fetchAllUsers({queryParams: currentDefaultUsersQueryParams, workspaceId}))

        const currentDefaultGroupsQueryParams = JSON.parse(defaultGroupsQueryParams, reviver);
        dispatch(fetchAllGroups({queryParams: currentDefaultGroupsQueryParams, workspaceId}))

        isMounted.current = false;
      }
    }
  }, [clientStatus, defaultGroupsQueryParams, defaultUsersQueryParams, dispatch, workspaceId])

  return (
    <MainCard>
      <Row className='pageTitleRow'>
        <Col>
          <h1 className='pageTitle'>Projects</h1>
        </Col>
      </Row>
      {isLoadParams.current && <Fragment>
        <CreateProject/>
        <Projects/>
      </Fragment>}
    </MainCard>
  )
};

export default ProjectsPage;
