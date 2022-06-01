import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import MainCard from '../../components/UI/MainCard/MainCard';
import ClientsActions from '../../components/Clients/ClientsActions/ClientsActions';
import ClientsList from '../../components/Clients/ClientsList/ClientsList';

import { Col, Row } from 'react-bootstrap';

import classes from './Clients.module.css';

import { fetchClientsData } from '../../components/Clients/store/clients-actions';
import { clientsActions } from '../../components/Clients/store/clients-slice';

const Clients = () => {

  const {activeWorkspace} = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {

    if (activeWorkspace) {
      dispatch(fetchClientsData({workspaceId: activeWorkspace}))
    }

    return () => dispatch(clientsActions.clearFilterClients())
  }, [dispatch, activeWorkspace])

  return (
    <MainCard>
      <Row className={classes.titleRow}>
        <Col>
          <h1 className='pageTitle'>Clients</h1>
        </Col>
      </Row>
      <ClientsActions/>
      <ClientsList/>
    </MainCard>
  )
}

export default Clients;
