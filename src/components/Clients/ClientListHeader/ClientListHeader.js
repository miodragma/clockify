import { Col } from 'react-bootstrap';

import ListHeaderRow from '../../UI/ListHeaderRow/ListHeaderRow';

const ClientListHeader = () => {

  return (
    <ListHeaderRow>
      <Col xs={5}>
        <p>Name</p>
      </Col>
      <Col xs={7}>
        <p>Address</p>
      </Col>
    </ListHeaderRow>
  )
}

export default ClientListHeader;
