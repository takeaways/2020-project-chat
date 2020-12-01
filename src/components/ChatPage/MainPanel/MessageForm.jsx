import React, { useState } from 'react'
import styled from 'styled-components'
import firebase from '../../../firebase'
import Form from 'react-bootstrap/Form'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector } from 'react-redux'
function MessageForm() {
  const chatRoom = useSelector((state) => state.chatRoom.currentChatRoom)
  const user = useSelector((state) => state.user.currentUser)
  const [content, setContet] = useState('')
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const messagesRef = firebase.database().ref('messages')

  const handleChange = (e) => setContet(e.target.value)

  const createMessage = (fileUrl = null) => {
    const { uid, displayName, photoURL } = user
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        uid,
        name: displayName,
        image: photoURL,
      },
    }
    if (fileUrl !== null) {
      message['image'] = fileUrl
    } else {
      message['content'] = content
    }
    return message
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content) {
      return setErrors((prev) => prev.concat('Type contents first'))
    }
    setLoading(true)

    try {
      await messagesRef.child(chatRoom.id).push().set(createMessage())
      setLoading(false)
      setContet('')
      setErrors([])
    } catch (error) {
      setErrors((pre) => pre.concat(error.message))
      setLoading(false)
      setTimeout(() => {
        setErrors([])
      }, 5000)
    }
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows={3}
            onChange={handleChange}
            value={content}
          />
        </Form.Group>
      </Form>
      <ProgressBar variant="warning" now={60} label={`60%`} />
      <div className="error">
        {errors.map((errorMsg) => (
          <p key={errorMsg}>{errorMsg}</p>
        ))}
      </div>
      <Row>
        <Col>
          <button onClick={handleSubmit}>SEND</button>
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
  .error {
    & > p {
      color: red;
    }
  }
`

export default MessageForm
