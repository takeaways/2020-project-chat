import React, { Component } from 'react'
import styled from 'styled-components'
import { FaRegSmileWink, FaPlus } from 'react-icons/fa'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import firebase from '../../../firebase'

class ChatRooms extends Component {
  state = {
    show: false,
    name: '',
    description: '',
    chatRoomsRef: firebase.database().ref('chatRooms'),
  }

  handleShow = () => this.setState({ show: true })
  handleClose = () => this.setState({ show: false })
  handleChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    })

  addChatRoom = () => {
    const { name, description } = this.state
    const { user } = this.props
    console.log(name, description, user)
    const newChatRoom = {
      id: this.state.chatRoomsRef.push().ref,
      name,
      description,
      createdBy: {
        name: user.displayName,
        image: user.photoURL,
      },
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { name, description } = this.state

    try {
      if (this.isFormValid(name, description)) {
        this.addChatRoom()
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.handleClose()
    }
  }

  isFormValid = (name, description) => name && description

  render() {
    return (
      <Wrapper>
        <div className="room-item">
          <FaRegSmileWink style={{ marginRight: 3 }} />
          CHAT ROOMS (1)
          <FaPlus
            style={{ position: 'absolute', right: 0, cursor: 'pointer' }}
            onClick={this.handleShow}
          />
        </div>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>새로운 챗팅방 생성</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>방 이름</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="챗팅방 이름"
                  name="name"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>방 설명</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="방 설명을 적어주세요."
                  name="description"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              취소
            </Button>
            <Button type="submit" variant="primary" onClick={this.handleSubmit}>
              방 생성
            </Button>
          </Modal.Footer>
        </Modal>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  }
}

export default connect(mapStateToProps)(ChatRooms)

const Wrapper = styled.div`
  .room-item {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
  }
`
