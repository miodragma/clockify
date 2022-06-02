import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Col, Row } from 'react-bootstrap';

import MainCard from '../../components/UI/MainCard/MainCard';
import Tags from '../../components/Tags';

import { fetchTagsData } from '../../components/Tags/store/tags-actions';
import { tagsActions } from '../../components/Tags/store/tags-slice';

const TagsPage = () => {

  const {activeWorkspace} = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {

    if (activeWorkspace) {
      dispatch(fetchTagsData({workspaceId: activeWorkspace}))
    }

    return () => dispatch(tagsActions.clearFilterTags(null))
  }, [dispatch, activeWorkspace])

  return (
    <MainCard>
      <Row className='pageTitleRow'>
        <Col>
          <h1 className='pageTitle'>Tags</h1>
        </Col>
      </Row>
      <Tags/>
    </MainCard>
  )
};

export default TagsPage;
