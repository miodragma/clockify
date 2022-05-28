import MainCard from '../../components/UI/MainCard/MainCard';
import ClientsActions from '../../components/Clients/ClientsActions/ClientsActions';

import { Col, Row } from 'react-bootstrap';

import classes from './Clients.module.css';
import ClientsList from '../../components/Clients/ClientsList/ClientsList';

const Clients = () => {
  return (
    <MainCard>
      <Row className={classes.titleRow}>
        <Col>
          <h1>Clients</h1>
        </Col>
      </Row>
      <ClientsActions/>
      <ClientsList/>
    </MainCard>
  )
}

export default Clients;
