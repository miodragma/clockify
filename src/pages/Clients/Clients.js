import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Col, Row } from 'react-bootstrap';

import MainCard from '../../components/UI/MainCard/MainCard';
import Clients from '../../components/Clients';

import { fetchClientsData } from '../../components/Clients/store/clients-actions';

const ClientsPage = () => {

  const {activeWorkspace: workspaceId} = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {

    if (workspaceId) {
      dispatch(fetchClientsData({workspaceId}))
    }
    /*TODO check whether should clear filter clients*/
    // return () => dispatch(clientsActions.clearFilterClients(null))
  }, [dispatch, workspaceId])

  return (
    <MainCard>
      <Row className='pageTitleRow'>
        <Col>
          <h1 className='pageTitle'>Clients</h1>
        </Col>
      </Row>
      <Clients/>
    </MainCard>
  )
}

export default ClientsPage;
