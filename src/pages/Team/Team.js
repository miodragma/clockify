import { Col, Row } from 'react-bootstrap';

import MainCard from '../../components/UI/MainCard/MainCard';

import Team from '../../components/Team/Team';

const TeamPage = () => {
  return (
    <MainCard>
      <Row className='pageTitleRow'>
        <Col>
          <h1 className='pageTitle'>Team</h1>
        </Col>
      </Row>
      <Team/>
    </MainCard>
  )
}

export default TeamPage;
