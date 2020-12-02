import React from 'react';
import styled from 'styled-components';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import Image from 'react-bootstrap/Image';
import { useSelector } from 'react-redux';

function MessageHeader({ handleSearchChange }) {
  const chatRoom = useSelector((state) => state.chatRoom.currentChatRoom);
  const isPrivateChatRoom = useSelector(
    (state) => state.chatRoom.isPrivateChatRoom,
  );

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col>
            <h2>
              {isPrivateChatRoom ? <FaLock /> : <FaLockOpen />}
              {chatRoom && chatRoom.name}
              <MdFavorite />
            </h2>
          </Col>

          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <AiOutlineSearch />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                onChange={handleSearchChange}
                placeholder="Search Message"
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Col>
        </Row>
        <div className="user">
          <p>
            <Image src={`ww`} /> userName
          </p>
        </div>
        <Row>
          <Col>
            <Accordion>
              <Card>
                <Card.Header style={{ padding: '0 1rem' }}>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    description
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
          <Col>
            <Accordion>
              <Card>
                <Card.Header style={{ padding: '0 1rem' }}>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Click me!
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  height: 170px;
  border: 0.2rem solid #ececec;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;

  h2 {
    font-size: 1.5rem;
  }
  .user {
    display: flex;
    justify-content: flex-end;
  }
`;
export default MessageHeader;
