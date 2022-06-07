import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Col, Row } from 'react-bootstrap';

import MainCard from '../../components/UI/MainCard/MainCard';
import Projects from '../../components/Projects';

import { reviver } from '../../components/Projects/store/projects-slice';
import { fetchProjectsData } from '../../components/Projects/store/projects-actions';

const ProjectsPage = () => {

  const {defaultQueryParams} = useSelector(state => state.projects);
  const {activeWorkspace: workspaceId} = useSelector(state => state.user.user);

  const {search} = useLocation();

  const queryParams = useMemo(() => new URLSearchParams(search), [search]);

  const dispatch = useDispatch();

  useEffect(() => {

    const initParams = new Map();
    for (let [key, value] of [...queryParams]) {
      initParams.set(key, value)
    }
    if (initParams.size === 0) {
      const currentDefaultQueryParams = JSON.parse(defaultQueryParams, reviver);
      dispatch(fetchProjectsData({queryParams: currentDefaultQueryParams, workspaceId}))
    } else {
      dispatch(fetchProjectsData({queryParams: initParams, workspaceId}))
    }

  }, [dispatch, queryParams, defaultQueryParams, workspaceId])

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
