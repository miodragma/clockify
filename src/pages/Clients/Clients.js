import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Col, Row } from 'react-bootstrap';

import MainCard from '../../components/UI/MainCard/MainCard';
import Clients from '../../components/Clients';

import { fetchClientsData } from '../../components/Clients/store/clients-actions';
import { clientsActions } from '../../components/Clients/store/clients-slice';

const ClientsPage = () => {

  const {activeWorkspace} = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {

    if (activeWorkspace) {
      dispatch(fetchClientsData({workspaceId: activeWorkspace}))
    }

    return () => dispatch(clientsActions.clearFilterClients(null))
  }, [dispatch, activeWorkspace])

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
