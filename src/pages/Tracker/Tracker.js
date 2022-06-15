import MainCard from '../../components/UI/MainCard/MainCard';
import { Col, Row } from 'react-bootstrap';

const TrackerPage = () => {
  return (
    <MainCard>
      <Row className='pageTitleRow'>
        <Col>
          <h1 className='pageTitle'>Time Tracker</h1>
        </Col>
      </Row>
    </MainCard>
  )
}

export default TrackerPage;
