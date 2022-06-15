import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Col, Row } from 'react-bootstrap';

import MainCard from '../../components/UI/MainCard/MainCard';
import Projects from '../../components/Projects';

import { reviver } from '../../components/Utils/reviver';

import { fetchProjectsData } from '../../components/Projects/store/projects-actions';
import { fetchClientsData } from '../../components/Clients/store/clients-actions';
import { fetchAllGroups, fetchAllUsers } from '../../components/Team/store/teams-actions';

import { dropdownArchiveData } from '../../components/Services/dropdownArchiveData/dropdown-archive-data';

const ProjectsPage = () => {

  const {activeWorkspace: workspaceId} = useSelector(state => state.user.user);
  const defaultQueryParams = useSelector(state => state.projects.defaultQueryParams);
  const {defaultUsersQueryParams, defaultGroupsQueryParams} = useSelector(state => state.teams);

  const {search} = useLocation();

  const isMounted = useRef(true);

  const queryParams = useMemo(() => new URLSearchParams(search), [search]);
  const clientStatus = queryParams.get('client-status');

  const dispatch = useDispatch();

  useEffect(() => {

    const initParams = new Map();
    for (let [key, value] of [...queryParams]) {
      initParams.set(key, value)
    }
    if (workspaceId) {
      if (initParams.size === 0) {
        const currentDefaultQueryParams = JSON.parse(defaultQueryParams, reviver);
        dispatch(fetchProjectsData({queryParams: currentDefaultQueryParams, workspaceId}))
      } else {
        dispatch(fetchProjectsData({queryParams: initParams, workspaceId}))
      }
    }

  }, [dispatch, queryParams, defaultQueryParams, workspaceId])

  useEffect(() => {
    if (isMounted.current) {
      if (workspaceId) {

        const archived = dropdownArchiveData.find(data => data.label.toUpperCase() === clientStatus).value;
        dispatch(fetchClientsData({workspaceId, archived, page: 'projects'}));

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
      <Projects/>
    </MainCard>
  )
};

export default ProjectsPage;
