import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { Col, Row } from 'react-bootstrap';

import MainCard from '../../components/UI/MainCard/MainCard';
import Projects from '../../components/Projects';

import { projectsActions, replacer, reviver } from '../../components/Projects/store/projects-slice';

import { mapQueryParams } from '../../components/Utils/mapQueryParams';

let isMounted = false;

const ProjectsPage = () => {

  const {defaultQueryParams} = useSelector(state => state.projects)

  const history = useHistory();
  const {search, pathname} = useLocation();

  const queryParams = useMemo(() => new URLSearchParams(search), [search]);

  const dispatch = useDispatch();

  useEffect(() => {

    if (!isMounted) {
      const currentDefaultQueryParams = JSON.parse(defaultQueryParams, reviver);
      const initParams = new Map();
      for (let [key, value] of [...queryParams]) {
        initParams.set(key, value)
      }
      if (initParams.size === 0) {
        console.log('PROJECT SIZE 0')
        history.replace({pathname, search: mapQueryParams(currentDefaultQueryParams)})
        dispatch(projectsActions.changeNewQueryParams(JSON.stringify(currentDefaultQueryParams, replacer)));
      } else {
        console.log('PROJECT SIZE ', initParams.size)
        dispatch(projectsActions.changeNewQueryParams(JSON.stringify(initParams, replacer)));
        history.replace({pathname, search: mapQueryParams(initParams)})
      }
      isMounted = true;
    }

  }, [dispatch, queryParams, defaultQueryParams, history, pathname])

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
