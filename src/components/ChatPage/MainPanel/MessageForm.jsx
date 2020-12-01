import React from 'react'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
function MessageForm() {
  return (
    <Wrapper>
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </Form>
      <ProgressBar variant="warning" now={60} label={`60%`} />
      <Row>
        <Col>
          <button>SEND</button>
        </Col>
        <Col>
          <button>UPLOAD</button>
        </Col>
      </Row>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  button {
    width: 100%;
    background: #7a84eb;

    color: white;
    text-transform: uppercase;
    border: none;
    margin-top: 40px;
    padding: 20px;
    font-size: 16px;
    font-weight: 100;
    letter-spacing: 10px;
  }
  button:hover {
    background: #636ee6;
  }
`

export default MessageForm
