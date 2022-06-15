import MainCard from '../../components/UI/MainCard/MainCard';
import { Col, Row } from 'react-bootstrap';

const TeamPage = () => {
  return (
    <MainCard>
      <Row className='pageTitleRow'>
        <Col>
          <h1 className='pageTitle'>Team</h1>
        </Col>
      </Row>
    </MainCard>
  )
}

export default TeamPage;
